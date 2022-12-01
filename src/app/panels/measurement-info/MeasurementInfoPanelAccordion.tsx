import { Accordion } from '../../../components/index';

import { MeasurementInfoPanel } from './MeasurementInfoPanel';

export function MeasurementInfoPanelAccordion() {
  return (
    <Accordion.Item title="Measurement info">
      <MeasurementInfoPanel />
    </Accordion.Item>
  );
}
