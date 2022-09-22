import { assertNotNull } from '../../utils/assert';
import { MeasurementKind, Measurements } from '../data/DataState';

import { AppState } from './appState';

export function getMeasurement(
  measurements: Measurements,
  kind: MeasurementKind,
  selected: string,
) {
  const measurement = measurements[kind].entries.find(
    (entry) => entry.id === selected,
  );
  return measurement || null;
}

export function getMeasurementOrFail(
  measurements: Measurements,
  kind: MeasurementKind,
  selected: string,
) {
  const result = getMeasurement(measurements, kind, selected);
  assertNotNull(result);

  return result;
}

export function getFirstMeasurement(
  measurements: Measurements,
  kind: MeasurementKind,
) {
  const measurement = measurements[kind].entries[0];
  if (measurement) return { kind, measurement };

  return null;
}

export function getCurrentMeasurement(state: AppState) {
  const { currentMeasurement } = state.view;
  if (!currentMeasurement) return null;
  const { kind, id } = currentMeasurement;

  return getMeasurement(state.data.measurements, kind, id);
}
