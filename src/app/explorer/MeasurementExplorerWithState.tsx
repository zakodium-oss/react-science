import { getCurrentMeasurementData, useAppState } from '../../app-data/index';
import { assertNotNull } from '../../components/index';

import { MeasurementExplorer } from './MeasurementExplorer';

export default function MeasurementExplorerWithState() {
  const appState = useAppState();
  const data = getCurrentMeasurementData(appState);
  assertNotNull(data);
  return (
    <MeasurementExplorer
      measurement={data.data}
      measurementDisplay={data.display}
    />
  );
}
