import { join } from 'path';

import { fileCollectionFromPath } from 'filelist-utils';

import { getEmptyDataState } from '../DataState';
import { append } from '../append';
import { cdfLoader } from '../loaders/cdfLoader';

export async function getGCMSMeasurement() {
  const dataState = getEmptyDataState();

  const filteredFileCollection = (
    await fileCollectionFromPath(join(__dirname, 'data/cdf/'))
  ).filter((file) => file.name === 'agilent-gcms.cdf');

  const gcmsEntry = (
    await append(filteredFileCollection, dataState, { loaders: [cdfLoader] })
  ).dataState.measurements.gclcms.entries;
  return gcmsEntry;
}
