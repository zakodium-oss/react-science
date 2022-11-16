import { assert, assertNotNull } from '../../../utils/assert';
import type { AppState } from '../index';

import type { MeasurementKind, Measurements } from './DataState';
import { measurementKinds } from './kinds';

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
  const measurement = measurements[kind].entries[0] || null;
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

export function getCurrentMeasurementData(state: AppState) {
  const selectedMeasurement = getCurrentMeasurement(state);
  if (!selectedMeasurement) return null;
  const kindAndId = getMeasurementKindAndId(state, selectedMeasurement.id);
  const display = state.view.measurements[selectedMeasurement.id];
  return { data: selectedMeasurement, display, kindAndId };
}

export interface MeasurementKindAndId {
  kind: MeasurementKind;
  id: string;
}

export function getMeasurementKindAndId(
  state: AppState,
  measurementId: string,
) {
  for (let kind of measurementKinds) {
    const measurement = getMeasurement(
      state.data.measurements,
      kind,
      measurementId,
    );
    if (measurement) return { kind, id: measurementId };
  }
  throw new Error(`Measurement kind for ${measurementId} not found`);
}

export function getSelectedMeasurement(
  state: AppState,
): MeasurementKindAndId | undefined {
  const { selectedKind, selectedMeasurements } = state.view;
  if (!selectedKind) return undefined;
  const kind = selectedKind;
  const currentMeasurements = selectedMeasurements[kind];
  if (!currentMeasurements) return undefined;
  // todo: change to return all selected measurements
  const id = currentMeasurements[0];
  return { kind, id };
}

export function getSelectedMeasurementOrFail(state: AppState) {
  const selected = getSelectedMeasurement(state);
  assert(selected);
  return selected;
}

export function* iterateMeasurementEntries(
  measurements: Partial<Measurements>,
) {
  for (const measurementData of Object.values(measurements)) {
    for (let x of measurementData.entries) {
      yield x;
    }
  }
}
