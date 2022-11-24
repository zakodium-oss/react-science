import {
  FileCollection,
  FileCollectionItem,
  fileCollectionFromFiles,
} from 'filelist-utils';

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
    // try FC and File[] separately to avoid indexing error
    if (files instanceof FileCollection) {
      //single item in FileCollection
      if (files.files.length === 1 && files.files[0].name.match(/\.ium$/i)) {
        await loadFullState(files.files[0], dispatch);
      } else {
        // multiple items in FileCollection
        const { measurements } = await loadMeasurements(files, options);
        dispatch({ type: 'ADD_MEASUREMENTS', payload: measurements });
      }
    } else if (files.length === 1 && files[0].name.match(/\.ium$/i)) {
      //single item in File[]
      await loadFullState(files[0], dispatch);
    } else {
      //multiple items in File[]
      const fileCollection = await fileCollectionFromFiles(files);
      const { measurements } = await loadMeasurements(fileCollection, options);
      dispatch({ type: 'ADD_MEASUREMENTS', payload: measurements });
    }
  } catch (error) {
    reportError(error);
  }
}

/** function executed for a single file */
async function loadFullState(
  file: FileCollectionItem | File,
  dispatch: AppDispatch,
) {
  //single file
  const data = await file.text();
  const appState: AppState = JSON.parse(data);
  dispatch({
    type: 'LOAD_FULL_STATE',
    payload: appState,
  });
}
