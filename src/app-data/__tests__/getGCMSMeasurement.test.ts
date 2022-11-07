import { expect, test } from 'vitest';

import { getDemoFileCollection } from '../../utils/test-utils';
import { loadMeasurements } from '../loadMeasurements';
import { cdfLoader } from '../loaders/cdfLoader';

const fileCollection = await getDemoFileCollection('cdf');

const filteredFileCollection = fileCollection.filter(
  (file) => file.name === 'agilent-gcms.cdf',
);

test('getGCMSMeasurement', async () => {
  const measurements = await loadMeasurements(filteredFileCollection, {
    loaders: [cdfLoader],
  });
  const result = measurements.gclcms.entries;
  expect(result).toHaveLength(1);
});
