import { produce } from 'immer';

import { getIRMeasurement } from '../../__tests__/getIRMeasurement';
import { irAutoPeakPickingEnhancer } from '../irAutoPeakPickingEnhancer';
import { irMeasurementEnhancer } from '../irMeasurementEnhancer';

test('irAutoPeakPickingEnhancer', async () => {
  const measurement = await getIRMeasurement();
  const nextState = await produce(measurement, async (draft) => {
    irMeasurementEnhancer(draft);
    irAutoPeakPickingEnhancer(draft, { xVariable: 'x', yVariable: 'a' });
  });
  const peaks = nextState.peaks;
  expect(peaks).toHaveLength(18);
});
