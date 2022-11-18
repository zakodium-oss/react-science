import {
  getCurrentMeasurementData,
  useAppState,
} from '../../../app-data/index';
import { assertNotNull } from '../../../components/index';
import { MeasurementPlot } from '../../helpers/index';

export function IvPlotView() {
  const appState = useAppState();
  const data = getCurrentMeasurementData(appState);
  assertNotNull(data);
  return (
    <MeasurementPlot
      measurement={data.data}
      measurementDisplay={data.display}
    />
  );
}
