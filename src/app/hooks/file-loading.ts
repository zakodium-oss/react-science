import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { FifoLogger } from 'fifo-logger';
import { FileCollection, fileCollectionFromWebSource } from 'filelist-utils';
import { useCallback } from 'react';

import { AppDispatch, useAppDispatch } from '../../app-data';
import { useFifoLogger, useHashSearchParams } from '../../components';

type LoadFn = (
  files: File[] | FileCollection,
  logger: FifoLogger,
  dispatch: AppDispatch,
) => Promise<void>;

export function useLoadFileCollectionFromHash(
  onLoad: LoadFn,
): UseQueryResult<true | null> {
  const logger = useFifoLogger();
  const appDispatch = useAppDispatch();
  const hashParams = useHashSearchParams();
  const filelistUrl = hashParams.get('filelist');
  return useQuery({
    queryKey: ['filelist', filelistUrl],
    queryFn: async () => {
      if (!filelistUrl) {
        return null;
      }
      const request = await fetch(filelistUrl);
      const data = await request.json();
      const baseURL = filelistUrl.replace(/\/[^/]*$/, '/');
      const fileCollection = await fileCollectionFromWebSource({
        entries: data,
        baseURL,
      });
      void onLoad(fileCollection, logger, appDispatch);
      return true;
    },
  });
}

export function useDropFiles(onLoad: LoadFn) {
  const dispatch = useAppDispatch();
  const logger = useFifoLogger();
  return useCallback(
    (files: File[]) => {
      void onLoad(files, logger, dispatch);
    },
    [dispatch, onLoad, logger],
  );
}
