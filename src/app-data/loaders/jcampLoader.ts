import { convert } from 'jcampconverter';

import { assert } from '../../components/index';
import type { Measurements, MeasurementBase, MeasurementKind } from '../index';

import {
  MeasurementsLoader,
  getMeasurementInfoFromFile,
  createLogEntry,
} from './utility/index';

/**
 *
 * @param fileCollection - the dragged file/files
 * @param logger - (optional) whether to log to console or not
 * @returns - new measurements object to be merged
 */
export const jcampLoader: MeasurementsLoader = async function jcampLoader(
  fileCollection,
  logs,
) {
  const newMeasurements: Partial<Measurements> = {};
  for (const file of fileCollection) {
    if (/(?:\.jdx|\.dx)$/i.test(file.name)) {
      try {
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
            Object.assign(newMeasurement.info, measurement.info);
            newMeasurements[kind]?.entries.push(newMeasurement);
          }
        }
      } catch (error) {
        // send error to UI ?
        if (error instanceof Error) {
          if (logs) {
            logs.push(
              createLogEntry({
                error,
                parser: 'jcamp converter',
                relativePath: file.relativePath,
                message: 'error parsing jdx or dx file',
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
};

function normalizeSpectra(spectra: any) {
  const data: MeasurementBase['data'] = [];
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
      for (let key in variables) {
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
