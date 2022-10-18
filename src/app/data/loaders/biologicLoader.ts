import { v4 } from '@lukeed/uuid';
import { convert } from 'biologic-converter';
import type { FileCollection } from 'filelist-utils';

import { getEmptyMeasurements, Loader } from '../DataState';
import type { MeasurementBase } from '../MeasurementBase';

export const biologicLoader: Loader = async function biologicLoader(
  fileCollection: FileCollection,
) {
  let measurements = getEmptyMeasurements();
  const results = await convert(fileCollection);
  for (let { dir, mpr, mps, mpt } of results) {
    //still not for plotting, just a schema
    const prepare: Partial<MeasurementBase> = {
      id: v4(),
      filename: '',
      path: dir,
      info: {},
      title: '',
    };
    if (mpr !== undefined) {
      prepare.meta = { settings: mpr.settings };
      prepare.data = [{ variables: mpr.data.variables }];
    } else if (mpt !== undefined) {
      prepare.meta = { settings: mpt.settings };
      prepare.data = [{ variables: mpt.data.variables }];
    } else if (mps !== undefined) {
      prepare.meta = { settings: mps.settings };
    }
    measurements.iv.entries.push(prepare as MeasurementBase);
  }
  return measurements;
};
