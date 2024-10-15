import { expect, test } from 'vitest';

import { getTestFileCollection } from '../../test-utils.js';
import {
  getIrAutoPeakPickingEnhancer,
  irMeasurementEnhancer,
  jcampLoader,
  loadMeasurements,
  wdfLoader,
} from '../index.js';

const loaders = [jcampLoader, wdfLoader];
const enhancers = {
  ir: [
    irMeasurementEnhancer,
    getIrAutoPeakPickingEnhancer({ xVariable: 'x', yVariable: 'a' }),
  ],
};

test('loadMeasurements function', async () => {
  const fileCollection = await getTestFileCollection();

  const { measurements } = await loadMeasurements(fileCollection, {
    loaders,
    enhancers,
  });

  const { ir, raman, uv } = measurements;
  expect(Object.keys(measurements)).toStrictEqual(['nmr', 'ir', 'uv', 'raman']);
  expect(ir?.entries).toHaveLength(2);

  expect(ir?.entries[0].peaks).toHaveLength(18);
  expect(ir?.entries[1].peaks).toHaveLength(42);
  expect(ir?.entries[0].peaks?.[0]).toStrictEqual({
    absorbance: 0.16390240095857445,
    kind: 'm',
    transmittance: 0.6856422936,
    wavenumber: 1049.0926378858535,
  });

  expect(raman?.entries).toHaveLength(1);
  expect(raman?.entries[0].data).toHaveLength(36);
  expect(raman?.entries[0].data[0].meta).toMatchObject({
    xPosition: -4501.903563829787,
    xPositionUnits: '10-6 metres (um)',
    yPosition: -2474.7475,
    yPositionUnits: '10-6 metres (um)',
  });
  expect(raman?.entries[0].data[0].variables.x.data).toHaveLength(1015);
  expect(raman?.entries[0].data[0].variables.y.data).toHaveLength(1015);

  expect(uv?.entries).toHaveLength(2);
});
