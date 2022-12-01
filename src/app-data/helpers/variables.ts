import { MeasurementVariable } from 'cheminfo-types';

import { MeasurementBase } from '../state/index';

export function getAllVariableSymbols(measurement: MeasurementBase): string[] {
  return Object.values(measurement.data[0].variables).map((v) => v.label);
}

export function getPreferredVariable(
  measurement: MeasurementBase,
  axis: 'x' | 'y',
): MeasurementVariable {
  if (axis === 'x') {
    return measurement.data[0].variables.x || measurement.data[0].variables.a;
  } else {
    return measurement.data[0].variables.y || measurement.data[0].variables.b;
  }
}

export function getVariableByLabel(
  measurement: MeasurementBase,
  label: string,
): MeasurementVariable | null {
  const variables = measurement.data[0].variables;
  for (const value of Object.values(variables)) {
    if (value.label === label) return value;
  }
  return null;
}
