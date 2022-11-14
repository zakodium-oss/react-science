import type { FileCollection } from 'filelist-utils';

import { Measurements, Loader, mergeMeasurements } from './DataState';
import { enhance } from './enhancers/enhance';

interface LoadOptions {
  loaders?: Loader[];
  enhancers?;
  logger?: boolean;
}

export async function loadMeasurements(
  fileCollection: FileCollection,
  options: LoadOptions = {},
) {
  const measurements: Partial<Measurements> = {};
  const { loaders = [], enhancers = {}, logger = true } = options;
  for (const loader of loaders) {
    const loaderData = await loader(fileCollection, logger);
    enhance(loaderData, enhancers);
    mergeMeasurements(measurements, loaderData);
  }
  return measurements;
}
