import { MeasurementBase, MeasurementViewState } from '../../../app-data/index';

import { MeasurementMassPlot } from './MeasurementMassPlot';

interface MassPlotViewProps {
  measurement: MeasurementBase;
  measurementDisplay: MeasurementViewState;
}

export function MassPlotView(props: MassPlotViewProps) {
  return <MeasurementMassPlot {...props} />;
}
