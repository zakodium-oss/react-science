import {
  getCurrentMeasurementData,
  useAppState,
} from '../../../app-data/index';
import { assertNotNull } from '../../../components/index';

import { MeasurementMassPlot } from './MeasurementMassPlot';

export function MassPlotView() {
  const appState = useAppState();
  const data = getCurrentMeasurementData(appState);
  assertNotNull(data);
  return (
    <MeasurementMassPlot
      measurement={data.data}
      measurementDisplay={data.display}
    />
  );
}
