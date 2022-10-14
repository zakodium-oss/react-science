import { v4 } from '@lukeed/uuid';
import type { PartialFileList } from 'filelist-utils';

import {
  MeasurementKind,
  Loader,
  Measurements,
  getEmptyMeasurements,
} from '../../../DataState';

export const cary500Loader: Loader = async function cary500Loader(
  fileList: PartialFileList,
) {
  const newMeasurements: Measurements = getEmptyMeasurements();

  for (const file of fileList) {
    if (file.name.match(/(?:\.csv)$/i)) {
      const parsed = convert(await file.text());

      /*
      newMeasurements.uvvis.entries.push({
        id: v4(),
        meta: measurement.meta,
        filename: file.name,
        path: file.webkitRelativePath,
        info: measurement.info,
        title: measurement.title,
        data: normalizeSpectra(measurement.spectra),
      });
      */
    }
  }
  return newMeasurements;
};

function convert(text: string) {}

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
