import type { FileCollection } from 'filelist-utils';

import { Measurements, enhance, Enhancers } from '../index';

import {
  MeasurementsLoader,
  mergeMeasurements,
} from './utility/measurementLoader';
import type { ParserLog } from './utility/parserLog';

interface LoadOptions {
  loaders?: MeasurementsLoader[];
  enhancers?: Partial<Enhancers>;
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
