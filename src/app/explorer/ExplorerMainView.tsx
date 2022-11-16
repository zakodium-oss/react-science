import { getCurrentMeasurementData, useAppState } from '../../app-data/index';
import { assertNotNull } from '../../utils/assert';
import { IvMainView, MassMainView } from '../kinds/index';

import { MeasurementExplorer } from './MeasurementExplorer';

export function ExplorerMainView() {
  const appState = useAppState();
  const data = getCurrentMeasurementData(appState);
  assertNotNull(data);
  switch (data.kindAndId.kind) {
    case 'mass':
      return (
        <MassMainView
          measurement={data.data}
          measurementDisplay={data.display}
        />
      );
    case 'iv':
      return (
        <IvMainView measurement={data.data} measurementDisplay={data.display} />
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
