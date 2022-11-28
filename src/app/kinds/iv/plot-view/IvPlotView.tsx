/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PlotController } from 'react-plot';

import IvMeasurementsPlot from './IvMeasurementsPlot';

export function IvPlotView() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
      `}
    >
      <PlotController>
        <IvMeasurementsPlot />
      </PlotController>
      <div>TODO: add variable selectors</div>
    </div>
  );
}
