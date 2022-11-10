import { v4 } from '@lukeed/uuid';
import type { FileCollection } from 'filelist-utils';
import { parse, guessSpectraType } from 'spc-parser';

import { assert } from '../../utils/assert';
import type { MeasurementKind, Measurements } from '../DataState';
import type { MeasurementBase } from '../MeasurementBase';

export async function spcLoader(fileCollection: FileCollection) {
  const measurements: Partial<Measurements> = {};
  for (const file of fileCollection) {
    if (file.name.match(/\.spc$/i)) {
      const parsed = parse(await file.arrayBuffer());
      const spectraType: MeasurementKind = guessSpectraType(parsed.meta);
      if (!measurements[spectraType]) {
        measurements[spectraType] = { entries: [] };
      }
      assert(
        measurements[spectraType],
        'Error while loading, kind is not defined',
      );
      measurements[spectraType]?.entries.push({
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
}
