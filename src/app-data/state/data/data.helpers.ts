import { assertNotNull } from '../../../components/index';
import type { AppState, AppView } from '../index';

import type { AppData, MeasurementKind, Measurements } from './AppData';
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
  const measurement = measurements[kind].entries[0];
  assertNotNull(measurement);
  return { kind, measurement };
}

export function getCurrentMeasurement(state: AppState) {
  const selectedMeasurement = getSelectedMeasurement(state.view);
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
  const kindAndId = getMeasurementKindAndId(state.data, selectedMeasurement.id);
  const display = state.view.measurements[selectedMeasurement.id];
  return { data: selectedMeasurement, display, kindAndId };
}

export function getFirstSelectedMeasurementData(state: AppState) {
  const {
    data,
    view: {
      selectedMeasurements,
      selectedKind,
      measurements: measurementsView,
    },
  } = state;
  if (!selectedKind) return null;

  const measurements = selectedMeasurements[selectedKind];
  if (measurements?.length === 0) return null;
  assertNotNull(measurements);

  const measurementId = measurements[0];
  const measurement = getMeasurement(
    data.measurements,
    selectedKind,
    measurementId,
  );

  return { data: measurement, display: measurementsView[measurementId] };
}

export interface MeasurementKindAndId {
  kind: MeasurementKind;
  id: string;
}

export function getMeasurementKindAndId(data: AppData, measurementId: string) {
  for (let kind of measurementKinds) {
    const measurement = getMeasurement(data.measurements, kind, measurementId);
    if (measurement) return { kind, id: measurementId };
  }
  throw new Error(`Measurement kind for ${measurementId} not found`);
}

export function getSelectedMeasurement(
  view: AppView,
): MeasurementKindAndId | null {
  const { selectedKind, selectedMeasurements } = view;
  if (!selectedKind) return null;
  const kind = selectedKind;
  const currentMeasurements = selectedMeasurements[kind];
  if (!currentMeasurements || currentMeasurements.length !== 1) return null;
  const id = currentMeasurements[0];
  return { kind, id };
}

export function getSelectedMeasurementOrFail(view: AppView) {
  const selected = getSelectedMeasurement(view);
  assertNotNull(selected);
  return selected;
}

export function* iterateMeasurementEntries(
  measurements: Partial<Measurements>,
) {
  for (const [measurementKind, measurementData] of Object.entries(
    measurements,
  )) {
    for (let measurement of measurementData.entries) {
      yield { kind: measurementKind as MeasurementKind, measurement };
    }
  }
}

export type MeasurementAndView<Kind extends MeasurementKind> = {
  measurement: Measurements[Kind]['entries'][number];
  view: AppView['measurements'][string];
};

export function* iterateKindMeasurementsAndView<Kind extends MeasurementKind>(
  state: AppState,
  kind: Kind,
): IterableIterator<MeasurementAndView<Kind>> {
  const measurements = state.data.measurements[kind];
  const view = state.view.measurements;
  for (let measurement of measurements.entries) {
    yield { measurement, view: view[measurement.id] };
  }
}

export function getExistingMeasurementKinds(
  measurements: Partial<Measurements>,
): MeasurementKind[] {
  const result: MeasurementKind[] = [];
  for (const [kind, { entries }] of Object.entries(measurements)) {
    if (entries.length > 0) {
      result.push(kind as MeasurementKind);
    }
  }
  return result;
}
