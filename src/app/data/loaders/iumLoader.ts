import type { FileCollection } from 'filelist-utils';

import {
  getEmptyMeasurements,
  Loader,
  Measurements,
  mergeMeasurements,
} from '../DataState';

import { assert } from '@/utils/assert';

export const iumLoader: Loader = async function iumLoader(
  fileCollection: FileCollection,
) {
  const measurements: Measurements = getEmptyMeasurements();

  for (const file of fileCollection) {
    if (file.name.match(/\.ium$/i)) {
      const parsed: Measurements = JSON.parse(await file.text()).measurements;
      assert(parsed, `measurements is missing in ${file.name} file`);
      mergeMeasurements(measurements, parsed);
    }
  }
  return measurements;
};
