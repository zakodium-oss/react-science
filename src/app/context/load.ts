import { FileCollection, fileCollectionFromFiles } from 'filelist-utils';

import type { MeasurementKind } from '../data/DataState';
import { loadMeasurements } from '../data/append';
import { getIRAutoPeakPickingEnhancer } from '../data/enhancers/irAutoPeakPickingEnhancer';
import { irMeasurementEnhancer } from '../data/enhancers/irMeasurementEnhancer';
import { biologicLoader } from '../data/loaders/biologicLoader';
import { jcampLoader } from '../data/loaders/jcampLoader';
import { cary500Loader } from '../data/loaders/proprietary/agilent/cary500Loader';
import { spcLoader } from '../data/loaders/spcLoader';
import { wdfLoader } from '../data/loaders/wdfLoader';

import type { AppDispatch } from './appState';

const options = {
  loaders: [jcampLoader, spcLoader, wdfLoader, biologicLoader, cary500Loader],
  enhancers: {
    ir: [
      irMeasurementEnhancer,
      getIRAutoPeakPickingEnhancer({ xVariable: 'x', yVariable: 'a' }),
    ],
  },
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
    const measurements = await loadMeasurements(fileCollection, options);
    dispatch({ type: 'ADD_MEASUREMENTS', payload: measurements });

    let kind: MeasurementKind | null = null;
    for (const k in measurements) {
      if (measurements[k].entries.length > 0) {
        kind = k as MeasurementKind;
        break;
      }
    }
    if (kind) {
      dispatch({
        type: 'SELECT_MEASUREMENT',
        payload: { id: measurements[kind].entries[0].id, kind },
      });
    }
  } finally {
    dispatch({ type: 'LOAD_END' });
  }
}
