import type { FileCollection } from 'filelist-utils';

import { Measurements, Loader, mergeMeasurements } from './DataState';
import { enhance } from './enhancers/enhance';
import type { ParserLog } from './loaders/utility/parserLog';

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
  let logs: ParserLog[] = [];
  const { loaders = [], enhancers = {}, logger = true } = options;
  for (const loader of loaders) {
    const loaderData = await loader(fileCollection, logger ? logs : undefined);
    enhance(loaderData, enhancers);
    mergeMeasurements(measurements, loaderData);
  }
  return { measurements, logs };
}
