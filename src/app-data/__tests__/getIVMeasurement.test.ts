import { expect, test } from 'vitest';

import { getTestFileCollection } from '../../test-utils';
import { loadMeasurements, biologicLoader } from '../index';

test('getIVMeasurement', async () => {
  const result = await getIVMeasurement();
  expect(result.entries).toHaveLength(2);
});

const loaders = [biologicLoader];

async function getIVMeasurement() {
  const fileCollection = await getTestFileCollection('biologic');
  const { measurements } = await loadMeasurements(fileCollection, { loaders });
  return measurements.iv || { entries: [] };
}
