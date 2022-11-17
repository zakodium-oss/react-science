import { MeasurementBase, MeasurementViewState } from '../../../app-data/index';
import { MeasurementPlot } from '../../helpers/index';

interface IvPlotViewProps {
  measurement: MeasurementBase;
  measurementDisplay: MeasurementViewState;
}

export function IvPlotView(props: IvPlotViewProps) {
  return <MeasurementPlot {...props} />;
}
