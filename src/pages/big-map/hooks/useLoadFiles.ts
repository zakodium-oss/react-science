import { fileCollectionFromFiles } from 'filelist-utils';

import { loadMeasurements, useAppDispatch } from '../../../app-data/index';
import { biologicLoader } from '../../../app-data/loaders/biologicLoader';

const options = {
  loaders: [biologicLoader],
};

export function useLoadFiles() {
  const dispatch = useAppDispatch();
  function loadFiles(files) {
    fileCollectionFromFiles(files)
      .then((fileCollection) => loadMeasurements(fileCollection, options))
      .then((data) => dispatch({ type: 'ADD_MEASUREMENTS', payload: data }))
      .catch((error) => {
        // TODO: handle error
        reportError(error);
      });
  }

  return loadFiles;
}
