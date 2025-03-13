import { Accordion } from '../../../components/index.js';

import { MeasurementInfoPanel } from './MeasurementInfoPanel.js';

export function MeasurementInfoPanelAccordion() {
  return (
    <Accordion.Item id="measurement-info" title="Measurement info" defaultOpen>
      <MeasurementInfoPanel />
    </Accordion.Item>
  );
}
