import { useAppState } from '../../../app-data/index';
import { Accordion } from '../../../components/index';

import { MeasurementConfigPanel } from './MeasurementConfigPanel';

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
      title={`Measurement${size > 1 ? 's' : ''} config`}
      defaultOpened
    >
      <MeasurementConfigPanel />
    </Accordion.Item>
  );
}
