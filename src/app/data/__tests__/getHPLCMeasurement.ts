import { join } from 'node:path';

import { fileCollectionFromPath } from 'filelist-utils';

import { getEmptyDataState } from '../DataState';
import { append } from '../append';
import { cdfLoader } from '../loaders/cdfLoader';

export async function getHPLCMeasurement() {
  const dataState = getEmptyDataState();

  const fileCollection = await fileCollectionFromPath(
    join(__dirname, 'data/cdf/'),
  );

  const filteredFileCollection = fileCollection.filter(
    (file) => file.name === 'agilent-hplc.cdf',
  );

  const appended = await append(filteredFileCollection, dataState, {
    loaders: [cdfLoader],
  });
  return appended.dataState.measurements.gclc.entries;
}
