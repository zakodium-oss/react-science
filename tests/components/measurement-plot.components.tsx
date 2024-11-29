import type { MeasurementPlotProps } from '../../src/app/helpers/index.js';
import { MeasurementPlot } from '../../src/app/helpers/index.js';
import type { MeasurementAppView } from '../../src/app-data/index.js';
import { irMeasurement } from '../../stories/data/data.js';

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
