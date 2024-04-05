import { FifoLogger } from 'fifo-logger';
import type { FileCollection } from 'filelist-utils';
import { convert } from 'jcampconverter';

import { assert } from '../../components/index';
import type { MeasurementKind, Measurements } from '../index';

import { getMeasurementInfoFromFile } from './utility/getMeasurementInfoFromFile';

/**
 *
 * @param fileCollection - the dragged file/files
 * @param logger - whether to log to console or not
 * @returns - new measurements object to be merged
 */
export async function jcampLoader(
  fileCollection: FileCollection,
  logger?: FifoLogger,
): Promise<Partial<Measurements>> {
  let count = 0;
  const newMeasurements: Partial<Measurements> = {};
  for (const file of fileCollection) {
    if (/(?:\.jdx|\.dx)$/i.test(file.name)) {
      try {
        // TODO: load in parallel
        // eslint-disable-next-line no-await-in-loop
        const parsed = convert(await file.text(), { keepRecordsRegExp: /.*/ });
        for (const measurement of parsed.flatten) {
          let kind: MeasurementKind | undefined;
          if (measurement?.dataType?.match(/infrared|ir/i)) {
            kind = 'ir';
          } else if (measurement?.dataType?.match(/raman/i)) {
            kind = 'raman';
          } else if (measurement?.dataType?.match(/uv/i)) {
            kind = 'uv';
          } else if (measurement?.dataType?.match(/mass/i)) {
            kind = 'mass';
          } else if (measurement?.dataType?.match(/nmr/i)) {
            kind = 'nmr';
          }
          if (kind) {
            if (!newMeasurements[kind]) {
              newMeasurements[kind] = { entries: [] };
            }
            assert(
              newMeasurements[kind],
              'Error while loading, kind is not defined',
            );
            const newMeasurement = {
              ...getMeasurementInfoFromFile(file, measurement.title || ''),
              meta: measurement.meta,
              data: normalizeSpectra(measurement.spectra),
            };
            count++;
            Object.assign(newMeasurement.info, measurement.info);
            newMeasurements[kind]?.entries.push(newMeasurement);
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          if (logger) {
            logger?.error(error);
          } else {
            throw error;
          }
        }
      }
    }
  }

  logger?.debug(`Loaded ${count} measurements with jcampLoader`);
  return newMeasurements;
}

function normalizeSpectra(spectra: any) {
  const data: any[] = [];
  for (const spectrum of spectra) {
    let variables = spectrum.variables;
    if (!variables) {
      variables = {};
      variables.x = {
        label: spectrum.xUnits,
        symbol: 'X',
        data: spectrum.data.x || spectrum.data.X,
      };
      variables.y = {
        label: spectrum.yUnits,
        symbol: 'Y',
        data: spectrum.data.y || spectrum.data.Y,
      };
    } else {
      for (const key in variables) {
        const variable = variables[key];
        if (variable.label) continue;
        variable.label = variable.name || variable.symbol || key;
        if (variable.units && !variable.label.includes(variable.units)) {
          variable.label += ` [${variable.units}]`;
        }
      }
    }
    data.push({ variables });
  }
  return data;
}
