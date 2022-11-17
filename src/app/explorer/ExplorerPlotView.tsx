import { getCurrentMeasurementData, useAppState } from '../../app-data/index';
import { assertNotNull } from '../../components/index';
import { IvPlotView, MassPlotView } from '../index';

import { MeasurementExplorer } from './MeasurementExplorer';

export function ExplorerPlotView() {
  const appState = useAppState();
  const data = getCurrentMeasurementData(appState);
  assertNotNull(data);
  switch (data.kindAndId.kind) {
    case 'mass':
      return (
        <MassPlotView
          measurement={data.data}
          measurementDisplay={data.display}
        />
      );
    case 'iv':
      return (
        <IvPlotView measurement={data.data} measurementDisplay={data.display} />
      );
    default: {
      return (
        <MeasurementExplorer
          measurement={data.data}
          measurementDisplay={data.display}
        />
      );
    }
  }
}
