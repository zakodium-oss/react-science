import { expect, test } from 'vitest';

import { getGCMSMeasurement } from './getGCMSMeasurement';

test('getGCMSMeasurement', async () => {
  const result = await getGCMSMeasurement();
  expect(result).toHaveLength(1);
});
