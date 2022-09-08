import { PartialFileList } from 'filelist-utils';

import { IRMeasurement } from './IRMeasurement';
import { MeasurementBase } from './MeasurementBase';

export interface DataState {
  measurements: Measurements;
}

interface Measurements {
  ir: {
    entries: IRMeasurement[];
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

export const kindsLabel: Record<MeasurementKind, string> = {
  ir: 'IR',
  raman: 'Raman',
  uv: 'UV',
  mass: 'Mass',
  nmr1h: 'NMR 1H',
  other: 'Other',
};

export type Loader = (
  fileList: PartialFileList,
  dataState: DataState,
) => Promise<void>;
