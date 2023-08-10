import {
  getCurrentMeasurementData,
  useAppState,
} from '../../../app-data/index';

import { MeasurementMassPlot } from './MeasurementMassPlot';

export function MassPlotView() {
  const appState = useAppState();
  const data = getCurrentMeasurementData(appState);

  if (!data) return <div>No selected measurement</div>;
  return (
    <MeasurementMassPlot
      measurement={data.data}
      measurementDisplay={data.display}
    />
  );
}
