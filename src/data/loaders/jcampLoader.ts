import { v4 } from '@lukeed/uuid';
import { PartialFileList } from 'filelist-utils';
import { convert } from 'jcampconverter';

import { DataState, MeasurementKind, Loader } from '../DataState';

export const jcampLoader: Loader = async function jcampLoader(
  fileList: PartialFileList,
  dataState: DataState,
) {
  for (const file of fileList) {
    if (file.name.match(/(?:\.jdx|\.dx)$/i)) {
      const parsed = convert(await file.text(), { keepRecordsRegExp: /.*/ });
      for (const measurement of parsed.flatten) {
        let kind: MeasurementKind | '' = '';
        if (measurement?.dataType?.match(/infrared|ir/i)) {
          kind = 'ir';
        }
        if (measurement?.dataType?.match(/raman/i)) {
          kind = 'raman';
        }
        if (measurement?.dataType?.match(/uv/i)) {
          kind = 'uv';
        }
        if (kind) {
          dataState.measurements[kind].entries.push({
            id: v4(),
            meta: measurement.meta,
            filename: file.name,
            path: file.webkitRelativePath,
            info: measurement.info,
            title: measurement.title,
            data: normalizeSpectra(measurement.spectra),
          });
        }
      }
    }
  }
};

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
