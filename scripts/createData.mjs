// Before running this script you should `npm run prepack`

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { fileCollectionFromPath } from 'filelist-utils';
import { produce } from 'immer';

import { getEmptyDataState } from '../lib/data/DataState.js';
import { append } from '../lib/data/append.js';
import { getIRAutoPeakPickingEnhancer } from '../lib/data/enhancers/irAutoPeakPickingEnhancer.js';
import { irMeasurementEnhancer } from '../lib/data/enhancers/irMeasurementEnhancer.js';
import { jcampLoader } from '../lib/data/loaders/jcampLoader.js';
import { wdfLoader } from '../lib/data/loaders/wdfLoader.js';

const dataState = getEmptyDataState();
const fileCollection = await fileCollectionFromPath(
  fileURLToPath(new URL('../test-data', import.meta.url)),
);

const loaders = [jcampLoader, wdfLoader];
const enhancers = {
  ir: [
    irMeasurementEnhancer,
    getIRAutoPeakPickingEnhancer({ xVariable: 'x', yVariable: 'a' }),
  ],
};

const { dataState: newDataState } = await append(fileCollection, dataState, {
  loaders,
  enhancers,
});

// we will hack a little bit the data to be able to test 'submeasurements'
const hackedDataState = produce(newDataState, (draft) => {
  draft.measurements.ir.entries[0].data.push(
    draft.measurements.ir.entries[1].data[0],
  );
});

writeFileSync(
  new URL('../stories/data/measurements.json', import.meta.url),
  JSON.stringify(
    hackedDataState,
    (key, value) => (ArrayBuffer.isView(value) ? Array.from(value) : value),
    2,
  ),
);

writeFileSync(
  new URL('../stories/data/irMeasurement.json', import.meta.url),
  JSON.stringify(
    hackedDataState.measurements.ir.entries[0],
    (key, value) => (ArrayBuffer.isView(value) ? Array.from(value) : value),
    2,
  ),
);

// eslint-disable-next-line no-console
console.log(hackedDataState);
