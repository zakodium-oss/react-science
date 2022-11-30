import { FileCollection, fileCollectionFromFiles } from 'filelist-utils';

import {
  loadMeasurements,
  biologicLoader,
  AppDispatch,
  LoadOptions,
} from '../../../app-data/index';

const options: LoadOptions = {
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
    const { measurements, logs } = await loadMeasurements(
      fileCollection,
      options,
    );
    if (logs.length > 0) {
      reportError(logs);
    }
    dispatch({ type: 'ADD_MEASUREMENTS', payload: measurements });
  } catch (error) {
    reportError(error);
  } finally {
    dispatch({ type: 'LOAD_STOP' });
  }
}
