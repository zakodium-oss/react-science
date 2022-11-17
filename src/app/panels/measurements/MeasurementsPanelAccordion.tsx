import {
  getExistingMeasurementKinds,
  kindLabels,
  useAppData,
} from '../../../app-data/index';
import { Accordion } from '../../../components/index';

import { MeasurementsPanel } from './MeasurementsPanel';

export function MeasurementsPanelAccordion() {
  const appData = useAppData();
  const kinds = getExistingMeasurementKinds(appData.measurements);
  const title =
    kinds.length === 1
      ? `${kindLabels[kinds[0]]} measurements`
      : 'Measurements';
  return (
    <Accordion.Item title={title} defaultOpened>
      <MeasurementsPanel />
    </Accordion.Item>
  );
}
