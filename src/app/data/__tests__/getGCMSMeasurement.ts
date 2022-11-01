import path from 'node:path';

import { fileCollectionFromPath } from 'filelist-utils';

import { getEmptyDataState } from '../DataState';
import { append } from '../append';
import { cdfLoader } from '../loaders/cdfLoader';

export async function getGCMSMeasurement() {
  const dataState = getEmptyDataState();

  const fileCollection = await fileCollectionFromPath(
    path.join(__dirname, 'data/cdf/'),
  );
  const filteredFileCollection = fileCollection.filter(
    (file) => file.name === 'agilent-gcms.cdf',
  );

  const appended = await append(filteredFileCollection, dataState, {
    loaders: [cdfLoader],
  });
  const gcmsEntry = appended.dataState.measurements.gclcms.entries;
  return gcmsEntry;
}
