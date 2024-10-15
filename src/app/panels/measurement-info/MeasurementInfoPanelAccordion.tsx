import { Accordion } from '../../../components/index.js';

import { MeasurementInfoPanel } from './MeasurementInfoPanel.js';

export function MeasurementInfoPanelAccordion() {
  return (
    <Accordion.Item title="Measurement info" defaultOpened>
      <MeasurementInfoPanel />
    </Accordion.Item>
  );
}
