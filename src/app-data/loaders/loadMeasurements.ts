import type { FileCollection } from 'filelist-utils';

import { Measurements, MeasurementKind, Enhancers, enhance } from '../index';

import {
  ParserLog,
  selectLoaderByKind,
  mergeMeasurements,
  MeasurementsLoader,
} from './utility/index';

interface LoadOptions {
  loadKind?: MeasurementKind;
  enhancers?: Partial<Enhancers>;
  logger?: boolean;
}

export async function loadMeasurements(
  fileCollection: FileCollection,
  options: LoadOptions = {},
) {
  const measurements: Partial<Measurements> = {};
  let logs: ParserLog[] = [];
  const { loadKind = 'other', enhancers = {}, logger = true } = options;
  const selectedLoaders: MeasurementsLoader[] = selectLoaderByKind[loadKind];
  for (const loader of selectedLoaders) {
    const loaderData = await loader(fileCollection, logger ? logs : undefined);
    enhance(loaderData, enhancers);
    mergeMeasurements(measurements, loaderData);
  }
  return { measurements, logs };
}
