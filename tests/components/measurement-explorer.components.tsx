import { MeasurementExplorer } from '../../src/app/index.js';
import type {
  IrMeasurement,
  MeasurementAppView,
} from '../../src/app-data/index.js';
import measurement from '../../stories/data/irMeasurement.json' with { type: 'json' };

const irMeasurement = measurement as IrMeasurement;

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
