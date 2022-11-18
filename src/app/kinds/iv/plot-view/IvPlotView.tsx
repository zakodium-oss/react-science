/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

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
      <IvMeasurementsPlot />
      <div>TODO: add variable selectors</div>
    </div>
  );
}
