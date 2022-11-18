import { produce } from 'immer';
import { expect, test } from 'vitest';

import { irAutoPeakPickingEnhancer } from '../irAutoPeakPickingEnhancer';
import { irMeasurementEnhancer } from '../irMeasurementEnhancer';

import { getIrMeasurement } from './getIrMeasurement';

test('irAutoPeakPickingEnhancer', async () => {
  const measurement = await getIrMeasurement();
  const nextState = await produce(measurement, async (draft) => {
    irMeasurementEnhancer(draft);
    irAutoPeakPickingEnhancer(draft, { xVariable: 'x', yVariable: 'a' });
  });
  const peaks = nextState.peaks;
  expect(peaks).toHaveLength(18);
});
