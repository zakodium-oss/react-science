import { MeasurementBase, MeasurementViewState } from '../../../app-data/index';
import { MeasurementPlot } from '../../helpers/index';

interface IvMainViewProps {
  measurement: MeasurementBase;
  measurementDisplay: MeasurementViewState;
}

export function IvMainView(props: IvMainViewProps) {
  return <MeasurementPlot {...props} />;
}
