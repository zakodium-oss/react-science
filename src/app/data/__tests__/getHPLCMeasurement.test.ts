import { join } from 'node:path';

import { fileCollectionFromPath } from 'filelist-utils';
import { expect, test } from 'vitest';

import { loadMeasurements } from '../loadMeasurements';
import { cdfLoader } from '../loaders/cdfLoader';

const fileCollection = await fileCollectionFromPath(
  join(__dirname, 'data/cdf/'),
);

const filteredFileCollection = fileCollection.filter(
  (file) => file.name === 'agilent-hplc.cdf',
);

test('getHPLCMeasurement', async () => {
  const measurements = await loadMeasurements(filteredFileCollection, {
    loaders: [cdfLoader],
  });
  const result = measurements.gclc.entries;
  expect(result).toHaveLength(1);
  expect(result[0].data[0].variables.y.label).toBe('uv254');
  expect(result[0].data[0].variables.y.data).toHaveLength(4651);
});
