import { FileCollection, fileCollectionFromFiles } from 'filelist-utils';
import { useCallback } from 'react';

import { getIRAutoPeakPickingEnhancer } from '../../../app-data/kinds/ir/irAutoPeakPickingEnhancer';
import { irMeasurementEnhancer } from '../../../app-data/kinds/ir/irMeasurementEnhancer';
import { AppDispatch, AppState, useAppDispatch } from '../../../app-data/index';
import { loadMeasurements } from '../../../app-data/loadMeasurements';
import { biologicLoader } from '../../../app-data/loaders/biologicLoader';
import { cdfLoader } from '../../../app-data/loaders/cdfLoader';
import { jcampLoader } from '../../../app-data/loaders/jcampLoader';
import { cary500Loader } from '../../../app-data/loaders/proprietary/agilent/cary500Loader';
import { spcLoader } from '../../../app-data/loaders/spcLoader';
import { wdfLoader } from '../../../app-data/loaders/wdfLoader';

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
