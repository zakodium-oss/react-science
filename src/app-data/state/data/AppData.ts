import type { Instrument, MeasurementVariable } from 'cheminfo-types';

import type { IRMeasurement } from '../../index';

export interface AppData {
  measurements: Measurements;
}

/**
 * When we have a simple measurement like uv, ir, etc, data should only contain one element
 * Sometimes measurements are more complex like in GC / MS, GC / MS / MS, raman images, etc. In this case we will add the meta and info properties
 * to differentiate each measurement
 * If we have isotherm with gaz absorption / desorption this format should also be used.
 * The 'info'for each 'Measurement' should be normalized.
 */

type UUID = string;

export interface MeasurementBase {
  id: UUID;
  title?: string;
  instrument?: Instrument;
  filename?: string;
  path?: string;
  // Structured object
  info: Record<string, any>;
  // Unstructured object
  meta: Record<string, any>;
  data: Array<{
    info?: Record<string, any>;
    meta?: Record<string, any>;
    variables: Record<string, MeasurementVariable>;
  }>;
}

export interface Measurements {
  ir: {
    entries: IRMeasurement[];
  };
  iv: {
    entries: MeasurementBase[];
  };
  raman: {
    entries: MeasurementBase[];
  };
  uv: {
    entries: MeasurementBase[];
  };
  uvvis: {
    entries: MeasurementBase[];
  };
  gclc: {
    entries: MeasurementBase[];
  };
  gclcms: {
    entries: MeasurementBase[];
  };
  nmr: {
    entries: MeasurementBase[];
  };
  mass: {
    entries: MeasurementBase[];
  };
  other: {
    entries: MeasurementBase[];
  };
}

export type MeasurementKind = keyof Measurements;
