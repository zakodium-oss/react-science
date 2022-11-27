import { test, expect } from 'vitest';

import { getTestFileCollection } from '../../test-utils';
import {
  loadMeasurements,
  getIrAutoPeakPickingEnhancer,
  irMeasurementEnhancer,
} from '../index';

const loadKind = 'ir';
const enhancers = {
  ir: [
    irMeasurementEnhancer,
    getIrAutoPeakPickingEnhancer({ xVariable: 'x', yVariable: 'a' }),
  ],
};

test('loadMeasurements function', async () => {
  const fileCollection = await getTestFileCollection();

  const { measurements } = await loadMeasurements(fileCollection, {
    loadKind,
    enhancers,
  });

  const { ir, raman, uv } = measurements;
  expect(Object.keys(measurements)).toStrictEqual(['ir', 'raman', 'nmr', 'uv']);
  expect(ir?.entries).toHaveLength(3); //ir now loads spc and jdx loaders

  expect(ir?.entries[1].peaks).toHaveLength(18);
  expect(ir?.entries[2].peaks).toHaveLength(42);
  expect(ir?.entries[1].peaks?.[0]).toStrictEqual({
    absorbance: 0.16390240095857445,
    kind: 'm',
    transmittance: 0.6856422936,
    wavenumber: 1049.0926378858535,
  });

  expect(raman?.entries).toHaveLength(1); //now loads spc and jdx loaders (but not wdf loader)
  expect(raman?.entries[0].data).toHaveLength(1);
  expect(raman?.entries[0].data[0].meta).toMatchObject({
    endingZ: 0,
    exponentY: 9,
    indexNumber: 0,
    noiseValue: 0,
    numberCoAddedScans: 0,
    numberPoints: 0,
    parameters: {
      changed: false,
      modifiedArithmetic: false,
      noPeakTable: false,
    },
    reserved: '',
    startingZ: 0,
    wAxisValue: 0,
  });
  expect(raman?.entries[0].data[0].variables.x.data).toHaveLength(3632);
  expect(raman?.entries[0].data[0].variables.y.data).toHaveLength(3632);

  expect(uv?.entries).toHaveLength(2);
});
