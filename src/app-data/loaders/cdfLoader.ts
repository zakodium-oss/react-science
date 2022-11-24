import type { FileCollection } from 'filelist-utils';
// @ts-expect-error netcdfjs has no types at the moment.
import { NetCDFReader } from 'netcdfjs';

import { assert } from '../../components/index';
import type { MeasurementBase, Measurements, MeasurementKind } from '../index';

import { getMeasurementInfoFromFile } from './utility/getMeasurementInfoFromFile';
import { ParserLog, createLogEntry } from './utility/parserLog';

export async function cdfLoader(
  fileCollection: FileCollection,
  logs?: ParserLog[],
): Promise<Partial<Measurements>> {
  const newMeasurements: Partial<Measurements> = {};
  let kind: MeasurementKind | undefined;
  for (const file of fileCollection) {
    if (/\.cdf$/i.test(file.name)) {
      try {
        const reader = new NetCDFReader(await file.arrayBuffer(), {
          meta: true,
        });

        if (
          reader.dataVariableExists('mass_values') &&
          reader.dataVariableExists('time_values')
        ) {
          kind = 'gclcms';
        } else if (
          reader.dataVariableExists('ordinate_values') &&
          reader.getAttribute('detector_name') &&
          reader.getAttribute('detector_name').match(/dad|tic/i)
        ) {
          kind = 'gclc';
        } else {
          return newMeasurements;
        }

        addMeta(reader, reader.globalAttributes);
        if (!newMeasurements[kind]) {
          newMeasurements[kind] = { entries: [] };
        }
        assert(
          newMeasurements[kind],
          'Error while loading, kind is not defined',
        );
        const newMeasurement = {
          ...getMeasurementInfoFromFile(
            file,
            reader.getAttribute('experiment_title'),
          ),
          meta: reader.header.meta,
          data:
            kind === 'gclcms'
              ? chromatogramWithMassSpectra(reader)
              : chromatogram(reader),
        };
        newMeasurements[kind]?.entries.push(newMeasurement);
      } catch (error) {
        if (error instanceof Error) {
          //send error to UI ?
          if (logs) {
            logs.push(
              createLogEntry({
                error,
                parser: 'cdfLoader',
                message: 'error parsing file from cdfLoader',
                relativePath: file.relativePath,
              }),
            );
          } else {
            throw error;
          }
        }
      }
    }
  }

  return newMeasurements;
}

function chromatogramWithMassSpectra(
  reader: NetCDFReader,
): MeasurementBase['data'] {
  // Taken from: https://github.com/cheminfo/netcdf-gcms
  const pointCount = reader.getDataVariable('point_count');
  const massValues = reader.getDataVariable('mass_values');
  const intensityValues = reader.getDataVariable('intensity_values');
  const times = reader.getDataVariable('scan_acquisition_time');
  const tics = reader.getDataVariable('total_intensity');

  let index = 0;
  const allMasses: Float64Array[] = [];
  const allIntensities: Float64Array[] = [];
  for (const size of pointCount) {
    const masses = new Float64Array(size);
    const intensities = new Float64Array(size);
    for (let j = 0; j < size; j++) {
      masses[j] = massValues[index];
      intensities[j] = intensityValues[index++];
    }
    allIntensities.push(intensities);
    allMasses.push(masses);
  }
  let data: MeasurementBase['data'] = [];
  for (let i = 0; i < times.length; i++) {
    data.push({
      info: {
        time: { value: times[i], units: 's' },
        tic: tics[i],
      },
      variables: {
        x: {
          symbol: 'X',
          label: 'm/z',
          units: '',
          data: allMasses[i] || [],
        },
        y: {
          symbol: 'Y',
          label: 'relative intensity',
          units: '',
          data: allIntensities[i] || [],
        },
      },
    });
  }
  return data;
}

function chromatogram(reader: NetCDFReader): MeasurementBase['data'] {
  // Taken from: https://github.com/cheminfo/netcdf-gcms
  let data: MeasurementBase['data'] = [];
  const intensities: number[] = reader.getDataVariable('ordinate_values');
  const numberPoints = intensities.length;
  const detector: string = reader.getAttribute('detector_name');
  let channel: string;
  if (/dad/i.test(detector)) {
    const uvNumber = detector.match(/.*Sig=(?<uvNumber>\d+).*/)?.groups
      ?.uvNumber;
    channel = `uv${Number(uvNumber) || ''}`;
  } else if (/tic/i.test(detector)) {
    channel = 'tic';
  } else {
    channel = 'unknown';
  }
  const delayTime: number = reader.getDataVariable('actual_delay_time')[0];
  const runtimeLength: number = reader.getDataVariable(
    'actual_run_time_length',
  )[0];
  let samplingInterval;
  if (reader.dataVariableExists('actual_sampling_interval')) {
    samplingInterval = reader.getDataVariable('actual_sampling_interval')[0];

    if (
      Math.abs(delayTime + samplingInterval * numberPoints - runtimeLength) > 3
    ) {
      throw new Error(
        'The expected last time does not correspond to the runtimeLength',
      );
    }
  } else {
    samplingInterval = (runtimeLength - delayTime) / numberPoints;
  }

  let times: number[] = [];
  let time = delayTime;
  for (let i = 0; i < numberPoints; i++) {
    times.push(time);
    time += samplingInterval;
  }

  data.push({
    variables: {
      x: {
        symbol: 'X',
        label: 'time',
        units: 's',
        data: times || [],
      },
      y: {
        symbol: 'Y',
        label: channel,
        units: '',
        data: intensities || [],
      },
    },
  });
  return data;
}

function addMeta(
  reader: NetCDFReader,
  globalAttributes: NetCDFReader.globalAttributes,
) {
  reader.header.meta = {};
  for (const item of globalAttributes) {
    reader.header.meta[item.name] = item.value;
  }
}
