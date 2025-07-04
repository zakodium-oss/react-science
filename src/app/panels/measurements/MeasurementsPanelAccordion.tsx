import { PanelStack } from '@blueprintjs/core';
import styled from '@emotion/styled';

import {
  getExistingMeasurementKinds,
  kindLabels,
  useAppData,
} from '../../../app-data/index.js';
import { Accordion } from '../../../components/index.js';

import { MeasurementsPanel } from './index.js';

const MeasurementsPanelStack = styled(PanelStack)`
  height: 100%;
`;

export function MeasurementsPanelAccordion() {
  const appData = useAppData();
  const kinds = getExistingMeasurementKinds(appData.measurements);
  const title =
    kinds.length === 1
      ? `${kindLabels[kinds[0]]} measurements`
      : 'Measurements';

  return (
    <Accordion.Item id="measurement-list" title={title} defaultOpen>
      <MeasurementsPanelStack
        initialPanel={{
          renderPanel: MeasurementsPanel,
        }}
        showPanelHeader={false}
        renderActivePanelOnly={false}
      />
    </Accordion.Item>
  );
}
