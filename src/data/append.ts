import { PartialFileList } from 'filelist-utils';
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
  fileList: PartialFileList,
  baseState: DataState,
  options: AppendOptions = {},
) {
  // We don't want that one loader has access to the currently growing new dataState
  // and therefore each loader starts with an empty dataState
  const newMeasurements = await loadMeasurements(fileList, options);

  const nextDataState = produce(baseState, (draft) => {
    for (let key in newMeasurements) {
      for (let entry of newMeasurements[key].entries) {
        draft.measurements[key].entries.push(entry);
      }
    }
  });

  return { logs: [], dataState: nextDataState };
}

export async function loadMeasurements(
  fileList: PartialFileList,
  options: AppendOptions = {},
) {
  const measurements: Measurements = getEmptyMeasurements();
  const { loaders = [], enhancers = {} } = options;
  for (const loader of loaders) {
    const loaderMeasurements = await loader(fileList);
    enhance(loaderMeasurements, enhancers);
    mergeMeasurements(measurements, loaderMeasurements);
  }
  return measurements;
}
