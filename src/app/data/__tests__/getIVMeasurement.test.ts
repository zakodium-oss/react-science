import path from 'node:path';

import { fileCollectionFromPath } from 'filelist-utils';
import { expect, test } from 'vitest';

import { loadMeasurements } from '../loadMeasurements';
import { biologicLoader } from '../loaders/biologicLoader';

test('getIVMeasurement', async () => {
  const result = await getIVMeasurement();
  expect(result.entries).toHaveLength(2);
});

const loaders = [biologicLoader];

async function getIVMeasurement() {
  const fileCollection = await fileCollectionFromPath(
    path.join(__dirname, 'data/biologic/'),
  );
  const measurements = await loadMeasurements(fileCollection, { loaders });
  return measurements.iv;
}
