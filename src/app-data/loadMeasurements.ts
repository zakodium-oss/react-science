import type { FileCollection } from 'filelist-utils';

import { Loader, Measurements, mergeMeasurements } from './DataState';
import { enhance } from './enhancers/enhance';

interface LoadOptions {
  loaders?: Loader[];
  enhancers?;
}

export async function loadMeasurements(
  fileCollection: FileCollection,
  options: LoadOptions = {},
) {
  const measurements: Partial<Measurements> = {};
  const { loaders = [], enhancers = {} } = options;
  for (const loader of loaders) {
    const loaderData = await loader(fileCollection);
    enhance(loaderData, enhancers);
    mergeMeasurements(measurements, loaderData);
  }
  return measurements;
}
