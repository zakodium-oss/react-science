import { PartialFileList } from 'filelist-utils';
import { produce } from 'immer';

import { DataState, Loader } from './DataState';
import { enhance } from './enhancers/enhance';
import { getEmptyDataState } from './getEmptyDataState';

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
  const { loaders = [], enhancers = {} } = options;

  // We don't want that one loader has access to the currently growing new dataState
  // and therefore each loader starts with an empty dataState
  const newMeasurements: any[] = [];
  for (const loader of loaders) {
    const newEntries = getEmptyDataState();
    await loader(fileList, newEntries);
    enhance(newEntries, enhancers);
    newMeasurements.push(newEntries);
  }

  const nextDataState = produce(baseState, (draft) => {
    for (const newEntries of newMeasurements) {
      for (let key in newEntries.measurements) {
        for (let entry of newEntries.measurements[key].entries) {
          draft.measurements[key].entries.push(entry);
        }
      }
    }
  });

  return { logs: [], dataState: nextDataState };
}
