import styled from '@emotion/styled';
import { PlotController } from 'react-plot';

import { useAppDispatch, useAppState } from '../../../../app-data/index.js';
import { Toolbar } from '../../../../components/index.js';

import IvMeasurementsPlot from './IvMeasurementsPlot.js';
import IvPlotVariablesSelector from './IvPlotVariablesSelector.js';

const IvPlotRoot = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const PlotRoot = styled.div`
  padding: 5px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export function IvPlotView() {
  return (
    <IvPlotRoot>
      <VerticalToolbar />
      <PlotRoot>
        <PlotController>
          <IvMeasurementsPlot />
        </PlotController>

        <IvPlotVariablesSelector />
      </PlotRoot>
    </IvPlotRoot>
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
    <Toolbar vertical>
      <Toolbar.Item onClick={onZoomOut} tooltip="Zoom out" icon="zoom-out" />
    </Toolbar>
  );
}
