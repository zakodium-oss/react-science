import {
  getCurrentMeasurementData,
  useAppState,
} from '../../../app-data/index.js';
import type { InfoPanelData } from '../../../components/index.js';
import { InfoPanel } from '../../../components/index.js';

export function MeasurementInfoPanel() {
  const appState = useAppState();
  const measurement = getCurrentMeasurementData(appState);
  if (!measurement) return null;

  // TODO: solution for multiple measurements
  const { meta, info } = measurement.data[0];

  const data: InfoPanelData[] = [
    {
      description: 'Information',
      data: info,
    },
    {
      description: 'Metadata',
      data: meta,
    },
  ];

  return <InfoPanel data={data} title="" />;
}
