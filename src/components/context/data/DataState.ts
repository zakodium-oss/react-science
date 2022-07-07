import { Instrument, MeasurementVariable } from 'cheminfo-types';
import { PartialFileList } from 'filelist-utils';

export interface DataState {
  measurements: Measurements;
}

interface Measurements {
  ir: {
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

export interface IRPeak {
  wavenumber: number;
  absorbance: number;
  transmittance: number;
  kind: 'S' | 'w' | 'm';
}
export interface MeasurementBase {
  id: string;
  title?: string;
  instrument?: Instrument;
  meta: Record<string, string | number | object>;
  info: Record<string, string | number | object>;
  data: {
    variables: Record<string, MeasurementVariable>;
  }[];
  peaks?: IRPeak[];
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

export type Processor = (
  fileList: PartialFileList,
  dataState: DataState,
) => Promise<void>;
