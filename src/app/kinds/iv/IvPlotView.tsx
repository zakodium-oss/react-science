import { MeasurementBase, MeasurementAppView } from '../../../app-data/index';
import { MeasurementPlot } from '../../helpers/index';

interface IvPlotViewProps {
  measurement: MeasurementBase;
  measurementDisplay: MeasurementAppView;
}

export function IvPlotView(props: IvPlotViewProps) {
  return <MeasurementPlot {...props} />;
}
