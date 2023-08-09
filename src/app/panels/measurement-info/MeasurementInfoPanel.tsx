import {
  getCurrentMeasurementData,
  useAppState,
} from '../../../app-data/index';
import { InfoPanelData, InfoPanel } from '../../../components/index';

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
