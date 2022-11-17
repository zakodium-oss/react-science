import {
  getCurrentMeasurementData,
  useAppState,
} from '../../../app-data/index';
import { Accordion } from '../../../components/index';

import { MeasurementInfoPanel } from './MeasurementInfoPanel';

export function MeasurementInfoPanelAccordion() {
  const appState = useAppState();
  const measurement = getCurrentMeasurementData(appState);
  if (!measurement) return null;
  return (
    <Accordion.Item title="Measurement info" defaultOpened>
      <MeasurementInfoPanel />
    </Accordion.Item>
  );
}
