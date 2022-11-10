import { assertNotNull } from '../utils/assert';

import type { MeasurementKind, Measurements } from './DataState';
import type { AppState } from './appState';

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
export function getFirstMeasurementOrFail(
  measurements: Measurements,
  kind: MeasurementKind,
) {
  const measurement = measurements[kind].entries[0];
  assertNotNull(measurement);

  return { kind, measurement };
}
export function getCurrentMeasurement(state: AppState) {
  const selectedMeasurement = getSelectedMeasurement(state);
  if (!selectedMeasurement) return null;
  return getMeasurement(
    state.data.measurements,
    selectedMeasurement.kind,
    selectedMeasurement.id,
  );
}

export function getSelectedMeasurement(state: AppState) {
  const { selectedKind, selectedMeasurements } = state.view;
  if (!selectedKind) return undefined;
  const kind = selectedKind;
  const currentMeasurements = selectedMeasurements[kind];
  if (!currentMeasurements) return undefined;
  // todo: change to return all selected measurements
  const id = currentMeasurements[0];
  return { kind, id };
}
