import { v4 } from '@lukeed/uuid';
import type { Value } from 'cheminfo-types';
import type { FileCollection } from 'filelist-utils';
import { xMaxValue } from 'ml-spectra-processing';
import { NetCDFReader } from 'netcdfjs';

import {
  MeasurementKind,
  Loader,
  Measurements,
  getEmptyMeasurements,
} from '../DataState';

export const cdfLoader: Loader = async function cdfLoader(
  fileCollection: FileCollection,
): Promise<Measurements> {
  const newMeasurements: Measurements = getEmptyMeasurements();
  for (const file of fileCollection) {
    if (file.name.match(/(?:\.cdf)$/i)) {
      const reader = new NetCDFReader(await file.arrayBuffer(), { meta: true });
      let kind: MeasurementKind | undefined;
      if (
        reader.dataVariableExists('mass_values') &&
        reader.dataVariableExists('time_values')
      ) {
        kind = 'gclcms';
      }

      const time = reader.getDataVariable('scan_acquisition_time');
      const tic = reader.getDataVariable('total_intensity');
      const pointCount = reader.getDataVariable('point_count');
      const massValues = reader.getDataVariable('mass_values');
      const intensityValues = reader.getDataVariable('intensity_values');
      addMeta(reader, reader.globalAttributes);

      let index = 0;
      for (let i = 0; i < pointCount.length; i++) {
         // Taken from: https://github.com/cheminfo/netcdf-gcms
        const size = pointCount[i];
        const mass = new Float64Array(size);
        const intensity = new Float64Array(size);
        for (let j = 0; j < size; j++) {
          mass[j] = massValues[index];
          intensity[j] = intensityValues[index++];
        }
        if (kind) {
          newMeasurements[kind].entries.push({
            id: v4(),
            meta: reader.header.meta,
            filename: file.name,
            path: file.relativePath || '',
            info: reader.getAttribute('experiment_title'),
            title: reader.getAttribute('experiment_title'),
            data: normalizeChromatogram({
              time: time[i],
              tic: tic[i],
              bpc: xMaxValue(intensity),
              mass,
              intensity,
            }),
          });
        }
      }
    }
  }
  return newMeasurements;
};

function normalizeChromatogram(datum: any) {
  let data: any = [];
  let variables: Variable = {
    meta: {},
    info: {
      time: datum.time,
      tic: datum.tic,
      bpc: datum.bpc,
    },
  };
  if (datum) {
    variables.x = {
      symbol: 'X',
      label: 'm/z',
      units: '',
      data: datum.mass || [],
    };
    variables.y = {
      symbol: 'Y',
      label: 'relative intensity',
      units: '',
      data: datum.intensity || [],
    };
  }
  data.push({ variables });
  return data;
}

function addMeta(reader, globalAttributes) {
  reader.header.meta = {};
  for (const item of globalAttributes) {
    reader.header.meta[item.name] = item.value;
  }
}

interface Serie {
  label?: string;
  symbol?: string;
  units?: string;
  data?: any[];
}

interface Variable {
  meta: any;
  info: {
    time: Value;
    tic?: number;
    bpc?: number;
  };
  x?: Serie;
  y?: Serie;
}
