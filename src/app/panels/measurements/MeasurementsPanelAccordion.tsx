import { PanelStack2 } from '@blueprintjs/core';
import styled from '@emotion/styled';

import {
  getExistingMeasurementKinds,
  kindLabels,
  useAppData,
} from '../../../app-data/index.js';
import { Accordion } from '../../../components/index.js';

import { MeasurementsPanel } from './index.js';

const MeasurementsPanelStack = styled(PanelStack2)`
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
    <Accordion.Item title={title} defaultOpened>
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
