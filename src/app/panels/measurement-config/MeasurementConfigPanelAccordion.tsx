import { useAppState } from '../../../app-data/index.js';
import { Accordion } from '../../../components/index.js';

import { MeasurementConfigPanel } from './MeasurementConfigPanel.js';

export function MeasurementConfigPanelAccordion() {
  const appState = useAppState();

  const {
    view: { selectedMeasurements, selectedKind },
  } = appState;

  if (!selectedKind) {
    return null;
  }

  const size = (selectedMeasurements[selectedKind] || []).length;
  return (
    <Accordion.Item
      id="measurement-config"
      title={`Measurement${size > 1 ? 's' : ''} config`}
      defaultOpen
    >
      <MeasurementConfigPanel />
    </Accordion.Item>
  );
}
