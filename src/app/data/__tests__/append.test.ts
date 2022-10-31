import path from 'node:path';

import { fileCollectionFromPath } from 'filelist-utils';
import { test, expect } from 'vitest';

import { getEmptyDataState } from '../DataState';
import { append } from '../append';
import { getIRAutoPeakPickingEnhancer } from '../enhancers/irAutoPeakPickingEnhancer';
import { irMeasurementEnhancer } from '../enhancers/irMeasurementEnhancer';
import { jcampLoader } from '../loaders/jcampLoader';
import { wdfLoader } from '../loaders/wdfLoader';

const loaders = [jcampLoader, wdfLoader];
const enhancers = {
  ir: [
    irMeasurementEnhancer,
    getIRAutoPeakPickingEnhancer({ xVariable: 'x', yVariable: 'a' }),
  ],
};

test('append', async () => {
  const dataState = getEmptyDataState();

  const fileCollection = await fileCollectionFromPath(
    path.join(__dirname, 'data'),
  );
  let { dataState: newDataState } = await append(fileCollection, dataState, {
    loaders,
    enhancers,
  });

  const { measurements } = newDataState;
  expect(Object.keys(measurements)).toStrictEqual([
    'ir',
    'iv',
    'raman',
    'uv',
    'uvvis',
    'gclc',
    'gclcms',
    'nmr',
    'mass',
    'other',
  ]);
  const { ir, raman, uv } = measurements;
  expect(ir.entries).toHaveLength(2);

  expect(ir.entries[0].peaks).toHaveLength(18);
  expect(ir.entries[1].peaks).toHaveLength(42);
  expect(ir.entries[0].peaks?.[0]).toStrictEqual({
    absorbance: 0.16390240095857445,
    kind: 'S',
    transmittance: 0.6856422936,
    wavenumber: 1049.0926378858535,
  });

  expect(raman.entries).toHaveLength(1);
  expect(raman.entries[0].data).toHaveLength(36);
  expect(raman.entries[0].data[0].meta).toMatchObject({
    xPosition: -4501.903563829787,
    xPositionUnits: '10-6 metres (um)',
    yPosition: -2474.7475,
    yPositionUnits: '10-6 metres (um)',
  });
  expect(raman.entries[0].data[0].variables.x.data).toHaveLength(1015);
  expect(raman.entries[0].data[0].variables.y.data).toHaveLength(1015);

  expect(uv.entries).toHaveLength(2);
});
