import type { MeasurementKind } from '../index';

export interface ViewState {
  selectedMeasurements: Partial<Record<MeasurementKind, Array<string>>>;
  selectedKind?: MeasurementKind;
  measurements: Record<string, MeasurementDisplay>;
}

export interface MeasurementDisplay {
  lineStroke: string;
}
