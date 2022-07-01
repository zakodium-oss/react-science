import { MeasurementKind } from '../data/DataState';

export interface AppState {
  measurements: {
    selected: string | undefined;
    kind: MeasurementKind | undefined;
  };
}
