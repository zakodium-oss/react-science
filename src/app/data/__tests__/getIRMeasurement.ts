import { join } from 'path';

import { FileCollection, fileCollectionFromPath } from 'filelist-utils';

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
  const fileCollection = await fileCollectionFromPath(
    join(__dirname, 'data/jdx/'),
  );
  //todo use 'filter' from fileCollection
  let filteredFileCollection;
  for (let f of fileCollection) {
    if (f.name === 'ir.jdx') {
      filteredFileCollection = new FileCollection([f]);
      break;
    }
  }
  const irEntry = (
    await append(filteredFileCollection, dataState, { loaders, enhancers })
  ).dataState.measurements.ir.entries[0];
  return irEntry;
}
