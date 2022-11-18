import { FileCollection, fileCollectionFromFiles } from 'filelist-utils';

import {
  getIrAutoPeakPickingEnhancer,
  irMeasurementEnhancer,
  AppDispatch,
  AppState,
  biologicLoader,
  cdfLoader,
  jcampLoader,
  cary500Loader,
  spcLoader,
  wdfLoader,
  loadMeasurements,
} from '../../../app-data/index';

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
      getIrAutoPeakPickingEnhancer({ xVariable: 'x', yVariable: 'a' }),
    ],
  },
};

export async function loadFiles(
  files: File[] | FileCollection,
  dispatch: AppDispatch,
) {
  try {
    if (files[0] && !files[1] && files[0].name.match(/\.ium$/i)) {
      const data = await files[0].text();
      const appState: AppState = JSON.parse(data);
      dispatch({
        type: 'LOAD_FULL_STATE',
        payload: appState,
      });
    } else {
      const fileCollection =
        files instanceof FileCollection
          ? files
          : await fileCollectionFromFiles(files);
      const { measurements } = await loadMeasurements(fileCollection, options);
      dispatch({ type: 'ADD_MEASUREMENTS', payload: measurements });
    }
  } catch (error) {
    reportError(error);
  }
}
