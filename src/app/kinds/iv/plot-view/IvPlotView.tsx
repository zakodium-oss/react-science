import styled from '@emotion/styled';
import { FaCompress } from 'react-icons/fa';
import { PlotController } from 'react-plot';

import { useAppDispatch, useAppState } from '../../../../app-data/index';
import { Toolbar } from '../../../../components/index';

import IvMeasurementsPlot from './IvMeasurementsPlot';
import IvPlotVariablesSelector from './IvPlotVariablesSelector';

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
    <Toolbar orientation="vertical">
      <Toolbar.Item onClick={onZoomOut} title="Zoom out">
        <FaCompress />
      </Toolbar.Item>
    </Toolbar>
  );
}
