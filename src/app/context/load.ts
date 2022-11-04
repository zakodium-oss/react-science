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

import type { AppDispatch, AppState } from './appState';

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
    if (files[0] && !files[1] && files[0].name.match(/\.ium$/i)) {
      const data = await files[0].text();
      const appState: Omit<AppState, 'isLoading'> = JSON.parse(data);
      dispatch({
        type: 'LOAD_STATE',
        payload: appState,
      });
    } else {
      const fileCollection =
        files instanceof FileCollection
          ? files
          : await fileCollectionFromFiles(files);
      const data = await loadMeasurements(fileCollection, options);
      dispatch({ type: 'ADD_MEASUREMENTS', payload: data });
    }
  } finally {
    dispatch({ type: 'LOAD_END' });
  }
}
