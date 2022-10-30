import { FileCollection, fileCollectionFromFiles } from 'filelist-utils';

import { loadMeasurements } from '../data/append';
import { getIRAutoPeakPickingEnhancer } from '../data/enhancers/irAutoPeakPickingEnhancer';
import { irMeasurementEnhancer } from '../data/enhancers/irMeasurementEnhancer';
import { biologicLoader } from '../data/loaders/biologicLoader';
import { cdfLoader } from '../data/loaders/cdfLoader';
import { jcampLoader } from '../data/loaders/jcampLoader';
import { cary500Loader } from '../data/loaders/proprietary/agilent/cary500Loader';
import { spcLoader } from '../data/loaders/spcLoader';
import { wdfLoader } from '../data/loaders/wdfLoader';

import type { AppDispatch } from './appState';

const options = {
  loaders: [
    jcampLoader,
    spcLoader,
    wdfLoader,
    biologicLoader,
    cary500Loader,
    cdfLoader,
  ],
  enhancers: {
    ir: [
      irMeasurementEnhancer,
      getIRAutoPeakPickingEnhancer({ xVariable: 'x', yVariable: 'a' }),
    ],
  },
};
export async function loadFiles(
  files: File[] | FileCollection,
  dispatch: AppDispatch,
) {
  dispatch({ type: 'LOAD_START' });
  try {
    const fileCollection =
      files instanceof FileCollection
        ? files
        : await fileCollectionFromFiles(files);
    const measurements = await loadMeasurements(fileCollection, options);
    dispatch({ type: 'ADD_MEASUREMENTS', payload: measurements });
  } finally {
    dispatch({ type: 'LOAD_END' });
  }
}
