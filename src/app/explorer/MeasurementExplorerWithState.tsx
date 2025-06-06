import {
  getCurrentMeasurementData,
  useAppState,
} from '../../app-data/index.js';

import { MeasurementExplorer } from './MeasurementExplorer.js';

export default function MeasurementExplorerWithState() {
  const appState = useAppState();
  const data = getCurrentMeasurementData(appState);

  if (!data) return <div>No selected measurement</div>;
  return (
    <MeasurementExplorer
      measurement={data.data}
      measurementDisplay={data.display}
    />
  );
}
