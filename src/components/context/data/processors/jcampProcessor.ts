import { v4 } from '@lukeed/uuid';
import { PartialFileList } from 'filelist-utils';
import { convert } from 'jcampconverter';

import { DataState, MeasurementKind, Processor } from '../DataState';
import { irSpectrumEnhancer } from '../enhancers/irSpectrumEnhancer';

const enhancers: Record<string, typeof irSpectrumEnhancer> = {
  ir: irSpectrumEnhancer,
};

export const jcampProcessor: Processor = async function jcampProcessor(
  fileList: PartialFileList,
  dataState: DataState,
) {
  for (const file of fileList) {
    if (/(?:\.jdx|\.dx)$/i.exec(file.name)) {
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
            //@ts-expect-error measurement.info should be ok
            meta: measurement.meta,
            filename: file.name,
            path: file.webkitRelativePath,
            //@ts-expect-error measurement.info should be ok
            info: measurement.info,
            title: measurement.title,
            data: normalizeSpectra(measurement.spectra, kind),
          });
        }
      }
    }
  }
};

function normalizeSpectra(spectra: any, kind: string) {
  const data = [];
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

    if (enhancers[kind]) {
      enhancers[kind](variables);
    }

    data.push({ variables });
  }
  return data;
}
