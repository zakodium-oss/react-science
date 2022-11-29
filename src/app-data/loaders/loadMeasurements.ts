import type { FileCollection } from 'filelist-utils';
import { xMinMaxValues } from 'ml-spectra-processing';

import { Measurements, enhance, Enhancers, MeasurementBase } from '../index';

import {
  MeasurementsLoader,
  mergeMeasurements,
} from './utility/measurementLoader';
import type { ParserLog } from './utility/parserLog';

export interface LoadOptions {
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
      if (
        typeof variable.min === 'undefined' ||
        typeof variable.max === 'undefined'
      ) {
        const { min, max } = xMinMaxValues(variable.data);
        variable.min = min;
        variable.max = max;
      }
    }
  }
}
