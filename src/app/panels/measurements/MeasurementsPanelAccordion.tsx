/** @jsxImportSource @emotion/react */
import { PanelStack2 } from '@blueprintjs/core';
import { css } from '@emotion/react';

import {
  getExistingMeasurementKinds,
  kindLabels,
  useAppData,
} from '../../../app-data/index';
import { Accordion } from '../../../components/index';

import { MeasurementsPanel } from '.';

export function MeasurementsPanelAccordion() {
  const appData = useAppData();
  const kinds = getExistingMeasurementKinds(appData.measurements);
  const title =
    kinds.length === 1
      ? `${kindLabels[kinds[0]]} measurements`
      : 'Measurements';
  return (
    <Accordion.Item title={title} defaultOpened>
      <PanelStack2
        css={css`
          height: 100%;
        `}
        initialPanel={{
          renderPanel: MeasurementsPanel,
        }}
        showPanelHeader={false}
        renderActivePanelOnly={false}
      />
    </Accordion.Item>
  );
}
