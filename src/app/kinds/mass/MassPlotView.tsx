import { MeasurementBase, MeasurementAppView } from '../../../app-data/index';

import { MeasurementMassPlot } from './MeasurementMassPlot';

interface MassPlotViewProps {
  measurement: MeasurementBase;
  measurementDisplay: MeasurementAppView;
}

export function MassPlotView(props: MassPlotViewProps) {
  return <MeasurementMassPlot {...props} />;
}
