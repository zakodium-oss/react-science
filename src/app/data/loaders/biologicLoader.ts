import { v4 } from '@lukeed/uuid';
import { convert } from 'biologic-converter';
import type { FileCollection } from 'filelist-utils';

import { getEmptyMeasurements, Loader } from '../DataState';

export const biologicLoader: Loader = async function biologicLoader(
  fileCollection: FileCollection,
) {
  let measurements = getEmptyMeasurements();
  const results = await convert(fileCollection);
  for (let result of results) {
    //still not for plotting, just a schema
    measurements.iv.entries.push({
      id: v4(),
      meta: result.mps ? { ...result.mps } : {},
      filename: '',
      path: result.dir,
      info: {},
      title: '',
      data: [],
    });
  }
  return measurements;
};
