import type { FileCollection } from 'filelist-utils';
import { produce } from 'immer';

import {
  DataState,
  getEmptyMeasurements,
  Loader,
  Measurements,
  mergeMeasurements,
} from './DataState';
import { enhance } from './enhancers/enhance';

interface AppendOptions {
  loaders?: Loader[];
  enhancers?;
}
/**
 * Adds in the state the information that can be extracted from the fileList
 * We can add 'loaders' that based on the extension, filename, path or content
 * could process the data before adding it in the state
 */
export async function append(
  fileCollection: FileCollection,
  baseState: DataState,
  options: AppendOptions = {},
) {
  // We don't want that one loader has access to the currently growing new dataState
  // and therefore each loader starts with an empty dataState
  const newMeasurements = await loadData(fileCollection, options);

  const nextDataState = produce(baseState, (draft) => {
    for (let key in newMeasurements) {
      for (let entry of newMeasurements[key].entries) {
        draft.measurements[key].entries.push(entry);
      }
    }
  });

  return { logs: [], dataState: nextDataState };
}

export async function loadData(
  fileCollection: FileCollection,
  options: AppendOptions = {},
) {
  const measurements: Measurements = getEmptyMeasurements();
  const { loaders = [], enhancers = {} } = options;
  for (const loader of loaders) {
    const loaderData = await loader(fileCollection);
    enhance(loaderData, enhancers);
    mergeMeasurements(measurements, loaderData);
  }
  return measurements;
}
