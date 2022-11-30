/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaCompress } from 'react-icons/fa';
import { PlotController } from 'react-plot';

import { useAppDispatch, useAppState } from '../../../../app-data/index';
import { Toolbar } from '../../../../components/index';

import IvMeasurementsPlot from './IvMeasurementsPlot';

export function IvPlotView() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        height: 100%;
      `}
    >
      <VerticalToolbar />
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
    </div>
  );
}

function VerticalToolbar() {
  const dispatch = useAppDispatch();
  const {
    view: { selectedKind },
  } = useAppState();

  function onZoomOut() {
    if (selectedKind) {
      dispatch({ type: 'PLOT_ZOOM_OUT', payload: { kind: selectedKind } });
    }
  }

  return (
    <Toolbar orientation="vertical">
      <Toolbar.Item onClick={onZoomOut} title="Zoom out">
        <FaCompress />
      </Toolbar.Item>
    </Toolbar>
  );
}
