import { writeFileSync } from 'fs';

import { fileListFromPath } from 'filelist-utils';

import { append } from '../lib/components/context/data/append.js';
import { getIRAutoPeakPickingEnhancer } from '../lib/components/context/data/enhancers/irAutoPeakPickingEnhancer.js';
import { irMeasurementEnhancer } from '../lib/components/context/data/enhancers/irMeasurementEnhancer.js';
import { getEmptyDataState } from '../lib/components/context/data/getEmptyDataState.js';
import { jcampLoader } from '../lib/components/context/data/loaders/jcampLoader.js';
import { wdfLoader } from '../lib/components/context/data/loaders/wdfLoader.js';

async function doAll() {
  const dataState = getEmptyDataState();
  const fileList = await fileListFromPath(
    new URL('../src/components/context/data/__tests__//data', import.meta.url)
      .pathname,
  );

  const loaders = [jcampLoader, wdfLoader];
  const enhancers = {
    ir: [
      irMeasurementEnhancer,
      getIRAutoPeakPickingEnhancer({ xVariable: 'x', yVariable: 'a' }),
    ],
  };

  const { dataState: newDataState } = await append(fileList, dataState, {
    loaders,
    enhancers,
  });

  writeFileSync(
    new URL('../stories/data/measurements.json', import.meta.url),
    JSON.stringify(newDataState, null, 2),
  );
  console.log(newDataState);
}

doAll();
