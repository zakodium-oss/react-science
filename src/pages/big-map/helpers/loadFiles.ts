import { FileCollection, fileCollectionFromFiles } from 'filelist-utils';

import { loadMeasurements, AppDispatch } from '../../../app-data/index';

const options: Parameters<typeof loadMeasurements>[1] = {
  loadKind: 'iv',
};

export async function loadFiles(
  files: File[] | FileCollection,
  dispatch: AppDispatch,
) {
  try {
    const fileCollection =
      files instanceof FileCollection
        ? files
        : await fileCollectionFromFiles(files);
    const { measurements } = await loadMeasurements(fileCollection, options);
    dispatch({ type: 'ADD_MEASUREMENTS', payload: measurements });
  } catch (error) {
    reportError(error);
  }
}
