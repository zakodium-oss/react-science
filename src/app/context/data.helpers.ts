import { measurementKinds, Measurements } from '../../data/DataState';
import { assertNotNull } from '../../utils/assert';

export function getMeasurement(measurements: Measurements, selected: string) {
  for (let kind of measurementKinds) {
    let measurement = measurements[kind].entries.find(
      (entry) => entry.id === selected,
    );
    if (measurement) return { kind, measurement };
  }
  return null;
}

export function getMeasurementOrFail(
  measurements: Measurements,
  selected: string,
) {
  const result = getMeasurement(measurements, selected);
  assertNotNull(result);
  return result;
}

export function getFirstMeasurement(measurements: Measurements) {
  for (let kind of measurementKinds) {
    let measurement = measurements[kind].entries[0];
    if (measurement) return { kind, measurement };
  }
  return null;
}
