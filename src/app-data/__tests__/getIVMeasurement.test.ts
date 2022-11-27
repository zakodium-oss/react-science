import { expect, test } from 'vitest';

import { getTestFileCollection } from '../../test-utils';
import { loadMeasurements } from '../index';

test('getIVMeasurement', async () => {
  const result = await getIVMeasurement();
  expect(result.entries).toHaveLength(2);
});

async function getIVMeasurement() {
  const fileCollection = await getTestFileCollection('biologic');
  const { measurements } = await loadMeasurements(fileCollection, {
    loadKind: 'iv',
  });
  return measurements.iv || { entries: [] };
}
