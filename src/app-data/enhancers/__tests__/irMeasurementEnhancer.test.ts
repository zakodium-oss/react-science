import { produce } from 'immer';
import { expect, test } from 'vitest';

import { getIRMeasurement } from '../../__tests__/getIRMeasurement';
import { irMeasurementEnhancer } from '../irMeasurementEnhancer';

test('irMeasurementEnhancer', async () => {
  const measurement = await getIRMeasurement();
  const nextState = produce(measurement, (draft) => {
    irMeasurementEnhancer(draft);
  });
  expect(nextState.data).toHaveLength(1);
  // we check that the new variables have been added
  for (let datum of nextState.data) {
    const keys = Object.keys(datum.variables);
    expect(keys).toHaveLength(4);
    expect(datum.variables.x.data).toHaveLength(934);
    expect(datum.variables.y.data).toHaveLength(934);
    expect(datum.variables.a.data).toHaveLength(934);
    expect(datum.variables.t.data).toHaveLength(934);
  }
});
