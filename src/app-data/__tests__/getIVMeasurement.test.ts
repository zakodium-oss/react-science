import { expect, test } from 'vitest';

import { getTestFileCollection } from '../../utils/test-utils';
import { loadMeasurements } from '../loadMeasurements';
import { biologicLoader } from '../loaders/biologicLoader';

test('getIVMeasurement', async () => {
  const result = await getIVMeasurement();
  expect(result.entries).toHaveLength(2);
});

const loaders = [biologicLoader];

async function getIVMeasurement() {
  const fileCollection = await getTestFileCollection('biologic');
  const measurements = await loadMeasurements(fileCollection, { loaders });
  return measurements.iv;
}
