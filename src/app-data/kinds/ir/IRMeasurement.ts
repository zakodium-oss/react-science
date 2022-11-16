import type { MeasurementBase } from '../../index';

import type { IRPeak } from './IRPeak';

/**
 * When we have a simple measurement like uv, ir, etc, data should only contain one element
 * Sometimes measurements are more complex like in GC / MS, GC / MS / MS, raman images, etc. In this case we will add the meta and info properties
 * to differentiate each measurement
 * If we have isotherm with gaz absorption / desorption this format should also be used.
 * The 'info'for each 'Measurement' should be normalized.
 */

export interface IRMeasurement extends MeasurementBase {
  peaks?: IRPeak[];
}
