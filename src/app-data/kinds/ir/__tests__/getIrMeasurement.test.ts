import { expect, test } from 'vitest';

import { getIrMeasurement } from './getIrMeasurement.js';

test('getIrMeasurement', async () => {
  const result = await getIrMeasurement();
  expect(result.data).toHaveLength(1);
});
