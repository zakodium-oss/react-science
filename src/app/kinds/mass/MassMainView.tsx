import { MeasurementBase, MeasurementViewState } from '../../../app-data/index';

import { MeasurementMassPlot } from './MeasurementMassPlot';

interface MassMainViewProps {
  measurement: MeasurementBase;
  measurementDisplay: MeasurementViewState;
}

export function MassMainView(props: MassMainViewProps) {
  return <MeasurementMassPlot {...props} />;
}
