import { v4 } from '@lukeed/uuid';
import type { FileCollection } from 'filelist-utils';
import { parse, guessSpectraType } from 'spc-parser';

import { getEmptyMeasurements, Loader, Measurements } from '../DataState';
import type { MeasurementBase } from '../MeasurementBase';

export const spcLoader: Loader<Measurements> = async function spcLoader(
  fileCollection: FileCollection,
) {
  let measurements = getEmptyMeasurements();
  for (const file of fileCollection) {
    if (file.name.match(/\.spc$/i)) {
      const parsed = parse(await file.arrayBuffer());
      const spectraType = guessSpectraType(parsed.meta);

      measurements[spectraType].entries.push({
        id: v4(),
        meta: parsed.meta,
        filename: file.name,
        path: file.relativePath || '',
        info: {},
        title: parsed.meta.memo,
        data: parsed.spectra as unknown as MeasurementBase['data'],
      });
    }
  }
  return measurements;
};
