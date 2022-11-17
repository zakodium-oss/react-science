import {
  getCurrentMeasurementData,
  useAppState,
} from '../../../app-data/index';
import { Accordion } from '../../../components/index';

import { MeasurementConfigPanel } from './MeasurementConfigPanel';

export function MeasurementConfigPanelAccordion() {
  const appState = useAppState();
  const measurement = getCurrentMeasurementData(appState);
  if (!measurement) return null;
  return (
    <Accordion.Item title="Measurement config" defaultOpened>
      <MeasurementConfigPanel />
    </Accordion.Item>
  );
}
