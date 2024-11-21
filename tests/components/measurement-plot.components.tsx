import type { MeasurementPlotProps } from '../../src/app/helpers/index.js';
import { MeasurementPlot } from '../../src/app/helpers/index.js';
import type {
  IrMeasurement,
  MeasurementAppView,
} from '../../src/app-data/index.js';
import measurement from '../../stories/data/irMeasurement.json';

const irMeasurement = measurement as IrMeasurement;
const measurementDisplay: MeasurementAppView = {
  color: {
    kind: 'fixed',
    color: 'red',
  },
  visible: true,
};

export function IrMeasurementPlot(
  props: Omit<MeasurementPlotProps, 'measurement' | 'measurementDisplay'>,
) {
  return (
    <MeasurementPlot
      measurement={irMeasurement}
      measurementDisplay={measurementDisplay}
      {...props}
    />
  );
}
