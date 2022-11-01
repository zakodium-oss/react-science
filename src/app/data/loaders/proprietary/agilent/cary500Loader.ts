import { v4 } from '@lukeed/uuid';
import type { FileCollection } from 'filelist-utils';

import { Loader, Measurements, getEmptyMeasurements } from '../../../DataState';

export const cary500Loader: Loader = async function cary500Loader(
  fileCollection: FileCollection,
): Promise<Measurements> {
  const newMeasurements: Measurements = getEmptyMeasurements();

  for (const file of fileCollection) {
    if (file.name.match(/\.csv$/i)) {
      const experiments = convert(await file.text());
      for (let experiment of experiments) {
        newMeasurements.uvvis.entries.push({
          id: v4(),
          meta: experiment.meta,
          filename: file.name,
          path: file.relativePath,
          info: {},
          title: experiment.title,
          data: [{ variables: experiment.variables }],
        });
      }
    }
  }
  return newMeasurements;
};

function convert(text: string) {
  // this format allows many experiments in one file
  const lines = text.split(/\r?\n/).map((line) => line.trim());

  const titles = lines[0].split(',').map((field) => field.trim());
  const labelUnits = lines[1].split(',').map((field) => field.trim());

  let lastDataIndex;
  for (lastDataIndex = 2; lastDataIndex < lines.length; lastDataIndex++) {
    if (!lines[lastDataIndex].match(/^[\d,.Ee-]+$/)) {
      break;
    }
  }
  const data = lines.slice(2, lastDataIndex).map((line) => line.split(','));
  const meta = lines.slice(lastDataIndex);
  const nbExperiments = Math.floor(labelUnits.length / 2);

  const experiments: any[] = [];
  for (let i = 0; i < nbExperiments; i++) {
    const column = i * 2;
    const xVariable = {
      label: labelUnits[column].replace(/ \(.*/, ''),
      units: labelUnits[column].includes('(')
        ? labelUnits[column].replace(/.*\((.*)\).*/, '$1')
        : '',
      data: data.map((row) => Number(row[column])),
    };
    const yVariable = {
      label: labelUnits[column + 1].replace(/ \(.*/, ''),
      units: labelUnits[column + 1].includes('(')
        ? labelUnits[column + 1].replace(/.*\((.*)\).*/, '$1')
        : '',
      data: data.map((row) => Number(row[column + 1])),
    };
    experiments.push({
      title: titles[column],
      meta: JSON.parse(JSON.stringify(meta)),
      variables: { x: xVariable, y: yVariable },
    });
  }
  return experiments;
}
