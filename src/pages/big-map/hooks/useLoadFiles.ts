import { fileCollectionFromFiles } from 'filelist-utils';

import {
  loadMeasurements,
  useAppDispatch,
  biologicLoader,
} from '../../../app-data/index';

const options = {
  loaders: [biologicLoader],
};

export function useLoadFiles() {
  const dispatch = useAppDispatch();
  function loadFiles(files) {
    fileCollectionFromFiles(files)
      .then((fileCollection) => loadMeasurements(fileCollection, options))
      .then(({ measurements }) =>
        dispatch({ type: 'ADD_MEASUREMENTS', payload: measurements }),
      )
      .catch((error) => {
        // TODO: handle error
        reportError(error);
      });
  }

  return loadFiles;
}
