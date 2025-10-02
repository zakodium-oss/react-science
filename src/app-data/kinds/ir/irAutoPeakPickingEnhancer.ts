import type { GSDOptions } from 'ml-gsd';
import { gsd } from 'ml-gsd';
import type { Shape1D } from 'ml-peak-shape-generator';
import { xMinMaxValues } from 'ml-spectra-processing';

import type { IrMeasurement } from './IrMeasurement.js';
import type { IrPeak, IrPeakKind } from './IrPeak.js';

export interface AutoPeakPickingOptions extends GSDOptions {
  /** x variable label, by default 'x' */
  xVariable?: string;
  /** y variable label, by default 'y' */
  yVariable?: string;
  shape?: Shape1D;
  /** First X value for the peak picking (default: first X value */
  from?: number;
  /** Last X value for the peak picking (default: last X value */
  to?: number;
  /** Minimal peak width */
  minPeakWidth?: number;
}

export function irAutoPeakPickingEnhancer(
  measurement: IrMeasurement,
  options: AutoPeakPickingOptions = {},
): void {
  const { xVariable = 'x', yVariable = 'y', minPeakWidth } = options;

  // we throw if there are more than one spectrum
  if (measurement.data.length > 1) {
    throw new Error(
      'autoPeakPickingEnhancer can only be applied if there is only on measurement data',
    );
  }
  if (measurement.data.length === 0) {
    return;
  }

  const datum = measurement.data[0];

  const x = datum.variables[xVariable]?.data;
  const y = datum.variables[yVariable]?.data;
  if (!x || !y) {
    return;
  }

  const { from, to } = options;

  let peaks: Array<{ x: number; y: number; width: number; index: number }> =
    gsd({ x, y }, options);

  if (from !== undefined) {
    peaks = peaks.filter((peak) => peak.x >= from);
  }
  if (to !== undefined) {
    peaks = peaks.filter((peak) => peak.x <= to);
  }
  if (minPeakWidth) {
    peaks = peaks.filter((peak) => peak.width >= minPeakWidth);
  }

  const minMaxTransmittance = xMinMaxValues(datum.variables.t.data);
  const results: IrPeak[] = peaks.map((peak) => ({
    wavenumber: datum.variables.x.data[peak.index],
    absorbance: datum.variables.a.data[peak.index],
    transmittance: datum.variables.t.data[peak.index] / 100,
    kind: getPeakKind(
      datum.variables.t.data[peak.index],
      minMaxTransmittance.min,
      minMaxTransmittance.max,
    ),
  }));

  measurement.peaks = results;
}

export function getIrAutoPeakPickingEnhancer(
  options: AutoPeakPickingOptions | undefined,
) {
  return (measurement: IrMeasurement) =>
    irAutoPeakPickingEnhancer(measurement, options);
}

function getPeakKind(
  transmittance: number,
  minTransmittance: number,
  maxTransmittance: number,
): IrPeakKind {
  const position =
    (maxTransmittance - transmittance) / (maxTransmittance - minTransmittance);
  if (position < 0.33) {
    return 'w';
  } else if (position < 0.66) {
    return 'm';
  }
  return 'S';
}
