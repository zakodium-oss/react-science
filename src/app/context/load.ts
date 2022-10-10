import type { PartialFileList } from 'filelist-utils';

import { loadMeasurements } from '../data/append';
import { getIRAutoPeakPickingEnhancer } from '../data/enhancers/irAutoPeakPickingEnhancer';
import { irMeasurementEnhancer } from '../data/enhancers/irMeasurementEnhancer';
import { biologicLoader } from '../data/loaders/biologicLoader';
import { jcampLoader } from '../data/loaders/jcampLoader';
import { spcLoader } from '../data/loaders/spcLoader';
import { wdfLoader } from '../data/loaders/wdfLoader';

import type { AppDispatch } from './appState';

const options = {
  loaders: [jcampLoader, spcLoader, wdfLoader, biologicLoader],
  enhancers: {
    ir: [
      irMeasurementEnhancer,
      getIRAutoPeakPickingEnhancer({ xVariable: 'x', yVariable: 'a' }),
    ],
  },
};
export async function loadFiles(
  files: File[] | PartialFileList,
  dispatch: AppDispatch,
) {
  dispatch({ type: 'LOAD_START' });
  try {
    const measurements = await loadMeasurements(files, options);
    dispatch({ type: 'ADD_MEASUREMENTS', payload: measurements });
  } finally {
    dispatch({ type: 'LOAD_END' });
  }
}
