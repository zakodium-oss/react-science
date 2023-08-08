import {
  getCurrentMeasurementData,
  useAppState,
} from '../../../app-data/index';
import { InfoPanelData, InfoPanel } from '../../../components/index';

export function MeasurementInfoPanel() {
  const appState = useAppState();
  const measurement = getCurrentMeasurementData(appState);
  if (!measurement) return null;
  const { meta, info } = measurement.data;

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
