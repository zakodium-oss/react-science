import { v4 } from '@lukeed/uuid';
import type { FileCollectionItem, FileCollection } from 'filelist-utils';

import { Measurements, getEmptyMeasurements } from '../../../DataState';
import type { MeasurementBase } from '../../../MeasurementBase';

export async function cary500Loader(
  fileCollection: FileCollection,
): Promise<Measurements> {
  const newMeasurements: Measurements = getEmptyMeasurements();

  for (const file of fileCollection) {
    if (file.name.match(/\.csv$/i)) {
      const experiments = await convert(file);
      for (const experiment of experiments) {
        newMeasurements.uvvis.entries.push(experiment);
      }
    }
  }
  return newMeasurements;
}

async function convert(file: FileCollectionItem): Promise<MeasurementBase[]> {
  const text = await file.text();
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

  const experiments: MeasurementBase[] = [];
  for (let i = 0; i < nbExperiments; i++) {
    const column = i * 2;
    const xVariable = {
      ...labelAndUnits(labelUnits[column]),
      data: data.map((row) => Number(row[column])),
    };
    const yVariable = {
      ...labelAndUnits(labelUnits[column + 1]),
      data: data.map((row) => Number(row[column + 1])),
    };
    experiments.push({
      id: v4(),
      filename: file.name,
      path: file.relativePath,
      info: {},
      title: titles[column],
      meta: JSON.parse(JSON.stringify(meta)),
      data: [{ variables: { x: xVariable, y: yVariable } }],
    });
  }
  return experiments;
}

function labelAndUnits(labelUnits: string) {
  const groups = labelUnits.match(/(?<label>.*) \((?<units>.*)\)/)?.groups;
  return groups || { label: labelUnits, units: '' };
}
