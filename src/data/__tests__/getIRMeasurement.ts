import { join } from 'path';

import { fileListFromPath } from 'filelist-utils';

import { getEmptyDataState } from '../DataState';
import { append } from '../append';
import { getIRAutoPeakPickingEnhancer } from '../enhancers/irAutoPeakPickingEnhancer';
import { irMeasurementEnhancer } from '../enhancers/irMeasurementEnhancer';
import { jcampLoader } from '../loaders/jcampLoader';

const loaders = [jcampLoader];
const enhancers = {
  ir: [
    irMeasurementEnhancer,
    getIRAutoPeakPickingEnhancer({ xVariable: 'x', yVariable: 'a' }),
  ],
};

export async function getIRMeasurement() {
  const dataState = getEmptyDataState();
  const fileList = (
    await fileListFromPath(join(__dirname, 'data/jdx/'))
  ).filter((file) => file.name === 'ir.jdx');
  const irEntry = (await append(fileList, dataState, { loaders, enhancers }))
    .dataState.measurements.ir.entries[0];
  return irEntry;
}
