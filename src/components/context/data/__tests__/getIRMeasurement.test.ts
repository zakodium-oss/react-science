import { getIRMeasurement } from './getIRMeasurement';

test('getIRMeasurement', async () => {
  const result = await getIRMeasurement();
  expect(result.data).toHaveLength(1);
});
