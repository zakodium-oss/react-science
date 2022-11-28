import { FileCollection, fileCollectionFromFiles } from 'filelist-utils';

import {
  loadMeasurements,
  biologicLoader,
  AppDispatch,
} from '../../../app-data/index';

const options = {
  loaders: [biologicLoader],
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
    const { measurements } = await loadMeasurements(fileCollection, options);
    dispatch({ type: 'ADD_MEASUREMENTS', payload: measurements });
  } catch (error) {
    reportError(error);
  } finally {
    dispatch({ type: 'LOAD_STOP' });
  }
}
