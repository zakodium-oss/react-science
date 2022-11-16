import type { FileCollection } from 'filelist-utils';

import { assert } from '../../../utils/assert';
import type { MeasurementBase, Measurements } from '../../index';

import type { ParserLog } from './parserLog';

export type MeasurementsLoader = (
  fileCollection: FileCollection,
  logs?: ParserLog[],
) => Promise<Partial<Measurements>>;

export function mergeMeasurements(
  measurements: Partial<Measurements>,
  newMeasurements: Partial<Measurements>,
) {
  for (const kind in newMeasurements) {
    if (!measurements[kind]) {
      measurements[kind] = { entries: [] };
    }
    assert(measurements[kind], 'Error while loading, kind is not defined');
    const entries: MeasurementBase[] = newMeasurements[kind].entries || [];
    measurements[kind].entries.push(...entries);
  }
}
