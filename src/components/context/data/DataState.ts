import { Instrument, MeasurementVariable } from 'cheminfo-types';

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

interface MeasurementBase {
  id: string;
  title?: string;
  instrument?: Instrument;
  meta: Record<string, string>;
  info: Record<string, string | number>;
  data: {
    variables: Record<string, MeasurementVariable>;
  }[];
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
