import { expect, test } from 'vitest';

import { getTestFileCollection } from '../../test-utils.js';
import { cdfLoader, loadMeasurements } from '../index.js';

const fileCollection = await getTestFileCollection('cdf');

const filteredFileCollection = fileCollection.filter(
  (file) => file.name === 'agilent-gcms.cdf',
);

test('getGCMSMeasurement', async () => {
  const { measurements } = await loadMeasurements(filteredFileCollection, {
    loaders: [cdfLoader],
  });
  const result = measurements.gclcms?.entries;
  expect(result).toHaveLength(1);
});
