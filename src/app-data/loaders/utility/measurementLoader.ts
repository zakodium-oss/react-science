import type { FifoLogger } from 'fifo-logger';
import type { FileCollection } from 'filelist-utils';

import { assert } from '../../../components/index';
import type { MeasurementBase, Measurements } from '../../index';

export type MeasurementsLoader = (
  fileCollection: FileCollection,
  logger?: FifoLogger,
) => Promise<Partial<Measurements>>;

export function mergeMeasurements(
  measurements: Partial<Measurements>,
  newMeasurements: Partial<Measurements>,
) {
  //fixes for putting type "string" to key
  let kind: keyof typeof newMeasurements;
  for (kind in newMeasurements) {
    if (!measurements[kind]) {
      measurements[kind] = { entries: [] };
    }
    assert(measurements[kind], 'Error while loading, kind is not defined');
    const entries: MeasurementBase[] = newMeasurements[kind]?.entries || [];
    measurements[kind]?.entries.push(...entries);
  }
}
