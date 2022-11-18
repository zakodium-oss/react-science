import { expect, test } from 'vitest';

import { getIrMeasurement } from './getIrMeasurement';

test('getIrMeasurement', async () => {
  const result = await getIrMeasurement();
  expect(result.data).toHaveLength(1);
});
