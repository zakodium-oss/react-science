import { FileCollection, fileCollectionFromFiles } from 'filelist-utils';
import { useCallback } from 'react';

import {
  getIRAutoPeakPickingEnhancer,
  irMeasurementEnhancer,
  AppDispatch,
  AppState,
  useAppDispatch,
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
      getIRAutoPeakPickingEnhancer({ xVariable: 'x', yVariable: 'a' }),
    ],
  },
};

async function doLoadFiles(
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
      const { measurements } = await loadMeasurements(fileCollection, options);
      dispatch({ type: 'ADD_MEASUREMENTS', payload: measurements });
    }
  } catch (error) {
    reportError(error);
  } finally {
    dispatch({ type: 'LOAD_END' });
  }
}

export function useLoadFiles() {
  const dispatch = useAppDispatch();
  return useCallback(
    (files: File[] | FileCollection) => {
      void doLoadFiles(files, dispatch);
    },
    [dispatch],
  );
}
