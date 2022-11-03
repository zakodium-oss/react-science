import { expect, test } from 'vitest';

import { getHPLCMeasurement } from './getHPLCMeasurement';

test('getHPLCMeasurement', async () => {
  const result = await getHPLCMeasurement();
  expect(result).toHaveLength(1);
  expect(result[0].data[0].variables.y.label).toBe('uv254');
  expect(result[0].data[0].variables.y.data).toHaveLength(4651);
});
