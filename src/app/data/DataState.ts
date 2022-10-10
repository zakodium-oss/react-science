import type { PartialFileList } from 'filelist-utils';

import type { IRMeasurement } from './IRMeasurement';
import type { MeasurementBase } from './MeasurementBase';

export interface DataState {
  measurements: Measurements;
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
  nmr1h: {
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

export const measurementKinds = Object.keys(
  getEmptyMeasurements(),
) as MeasurementKind[];

export const kindsLabel: Record<MeasurementKind, string> = {
  ir: 'IR',
  iv: 'IV',
  raman: 'Raman',
  uv: 'UV',
  mass: 'Mass',
  nmr1h: 'NMR 1H',
  other: 'Other',
};

export type Loader = (fileList: PartialFileList) => Promise<Measurements>;

export function mergeMeasurements(
  measurements: Measurements,
  newMeasurements: Measurements,
) {
  for (const kind in newMeasurements) {
    const entries: MeasurementBase[] = newMeasurements[kind].entries || [];
    measurements[kind].entries.push(...entries);
  }
}

export function getEmptyMeasurements(): Measurements {
  return {
    ir: { entries: [] },
    iv: { entries: [] },
    raman: { entries: [] },
    uv: { entries: [] },
    nmr1h: { entries: [] },
    mass: { entries: [] },
    other: { entries: [] },
  };
}

export function getEmptyDataState(): DataState {
  return {
    measurements: getEmptyMeasurements(),
  };
}
