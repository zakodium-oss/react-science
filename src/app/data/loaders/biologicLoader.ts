import { v4 } from '@lukeed/uuid';
import { convert } from 'biologic-converter';
import type { FileCollection } from 'filelist-utils';

import { getEmptyMeasurements, Loader, Measurements } from '../DataState';
import type { MeasurementBase } from '../MeasurementBase';

export const biologicLoader: Loader<Measurements> =
  async function biologicLoader(fileCollection: FileCollection) {
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
        prepare.meta = { ...mpr.settings.variables };
        prepare.data = [{ variables: mpr.data.variables }];
      } else if (mpt !== undefined) {
        prepare.meta = { ...mpt.settings.variables };
        prepare.data = [{ variables: mpt.data.variables }];
      } else if (mps !== undefined) {
        prepare.meta = { ...mps.settings.variables };
      }
      measurements.iv.entries.push(prepare as MeasurementBase);
    }
    return measurements;
  };
