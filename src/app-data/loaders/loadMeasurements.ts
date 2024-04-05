import { FifoLogger } from 'fifo-logger';
import type { FileCollection } from 'filelist-utils';
import { xMinMaxValues } from 'ml-spectra-processing';

import { enhance, Enhancers, MeasurementBase, Measurements } from '../index';

import {
  MeasurementsLoader,
  mergeMeasurements,
} from './utility/measurementLoader';
import type { ParserLog } from './utility/parserLog';

export interface LoadOptions {
  loaders?: MeasurementsLoader[];
  enhancers?: Partial<Enhancers>;
  logger?: FifoLogger;
}

export async function loadMeasurements(
  fileCollection: FileCollection,
  options: LoadOptions,
) {
  const measurements: Partial<Measurements> = {};
  const logs: ParserLog[] = [];
  const { loaders = [], enhancers = {}, logger } = options;
  for (const loader of loaders) {
    // TODO: load in parallel
    // eslint-disable-next-line no-await-in-loop
    const loaderData = await loader(fileCollection, logger);
    for (const { entries } of Object.values(loaderData)) {
      for (const entry of entries) {
        computeMinMax(entry);
      }
    }
    enhance(loaderData, enhancers);
    mergeMeasurements(measurements, loaderData);
  }
  return { measurements, logs };
}

function computeMinMax(measurement: MeasurementBase) {
  for (const datum of measurement.data) {
    for (const variable of Object.values(datum.variables)) {
      if (variable.data.length === 0) {
        // TODO: should we accept empty data?
        return;
      }
      if (variable.min === undefined || variable.max === undefined) {
        const { min, max } = xMinMaxValues(variable.data);
        variable.min = min;
        variable.max = max;
      }
    }
  }
}
