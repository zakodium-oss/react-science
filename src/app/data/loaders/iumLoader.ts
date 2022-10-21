import type { FileCollection } from 'filelist-utils';

import type { Loader } from '../DataState';

import { AppState, getEmptyAppState } from '@/app/context/appState';

export const iumLoader: Loader = async function iumLoader(
  fileCollection: FileCollection,
) {
  let state: AppState = getEmptyAppState();

  for (const file of fileCollection) {
    if (file.name.match(/(?:\.ium)$/i)) {
      state = {
        ...JSON.parse(await file.text()),
        isLoading: true,
      };
    }
  }
  return state;
};
