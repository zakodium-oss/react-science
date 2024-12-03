import { MeasurementExplorer } from '../../src/app/index.js';
import type { MeasurementAppView } from '../../src/app-data/index.js';
import { irMeasurement } from '../../stories/data/data.js';

const measurementDisplay: MeasurementAppView = {
  color: {
    kind: 'fixed',
    color: 'red',
  },
  visible: true,
};

export function IrMeasurementExplorer() {
  return (
    <MeasurementExplorer
      measurement={irMeasurement}
      measurementDisplay={measurementDisplay}
    />
  );
}
