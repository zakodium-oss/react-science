import { produce } from 'immer';
import { expect, test } from 'vitest';

import { irAutoPeakPickingEnhancer } from '../irAutoPeakPickingEnhancer.js';
import { irMeasurementEnhancer } from '../irMeasurementEnhancer.js';

import { getIrMeasurement } from './getIrMeasurement.js';

test('irAutoPeakPickingEnhancer', async () => {
  const measurement = await getIrMeasurement();
  const nextState = produce(measurement, (draft) => {
    irMeasurementEnhancer(draft);
    irAutoPeakPickingEnhancer(draft, { xVariable: 'x', yVariable: 'a' });
  });
  const peaks = nextState.peaks;
  expect(peaks).toHaveLength(18);
});
