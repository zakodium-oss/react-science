import { useQuery } from '@tanstack/react-query';
import { FileCollection, fileCollectionFromWebservice } from 'filelist-utils';
import { useCallback } from 'react';

import { AppDispatch, useAppDispatch } from '../../app-data/index';
import { useHashSearchParams } from '../../components/index';

type LoadFn = (
  files: File[] | FileCollection,
  dispatch: AppDispatch,
) => Promise<void>;

export function useLoadFileCollectionFromHash(onLoad: LoadFn) {
  const appDispatch = useAppDispatch();
  const hashParams = useHashSearchParams();
  const filelistUrl = hashParams.get('filelist');
  const query = useQuery({
    queryKey: ['filelist', filelistUrl],
    queryFn: async () => {
      if (!filelistUrl) {
        return null;
      }
      const fileCollection = await fileCollectionFromWebservice(filelistUrl);
      void onLoad(fileCollection, appDispatch);
      return true;
    },
  });
  return query;
}

export function useDropFiles(onLoad: LoadFn) {
  const dispatch = useAppDispatch();
  const onDrop = useCallback(
    (files: File[]) => {
      void onLoad(files, dispatch);
    },
    [dispatch, onLoad],
  );
  return onDrop;
}
