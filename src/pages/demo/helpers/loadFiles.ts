import type { FifoLogger } from 'fifo-logger';
import {
  FileCollection,
  fileCollectionFromFiles,
  type FileCollectionItem,
} from 'filelist-utils';

import {
  type AppDispatch,
  type AppState,
  biologicLoader,
  cary500Loader,
  cdfLoader,
  getIrAutoPeakPickingEnhancer,
  irMeasurementEnhancer,
  jcampLoader,
  loadMeasurements,
  spcLoader,
  wdfLoader,
} from '../../../app-data/index.js';

const baseOptions = {
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
  logger: FifoLogger,
  dispatch: AppDispatch,
) {
  dispatch({ type: 'LOAD_START' });
  try {
    // try FC and File[] separately to avoid indexing error
    if (files instanceof FileCollection) {
      //single item in FileCollection
      if (files.files.length === 1 && files.files[0].name.match(/\.ium$/i)) {
        await loadFullState(files.files[0], dispatch);
      } else {
        // multiple items in FileCollection
        const { measurements, logs } = await loadMeasurements(files, {
          ...baseOptions,
          logger,
        });
        if (logs.length > 0) {
          reportError(logs);
        }
        dispatch({ type: 'ADD_MEASUREMENTS', payload: measurements });
      }
    } else if (files.length === 1 && files[0].name.match(/\.ium$/i)) {
      //single item in File[]
      await loadFullState(files[0], dispatch);
    } else {
      //multiple items in File[]
      const fileCollection = await fileCollectionFromFiles(files);
      const { measurements, logs } = await loadMeasurements(fileCollection, {
        ...baseOptions,
        logger,
      });
      if (logs.length > 0) {
        reportError(logs);
      }
      dispatch({ type: 'ADD_MEASUREMENTS', payload: measurements });
    }
  } catch (error) {
    reportError(error);
  } finally {
    dispatch({ type: 'LOAD_STOP' });
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
