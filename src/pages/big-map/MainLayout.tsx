/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import {
  getCurrentMeasurementData,
  useAppDispatch,
  useAppState,
} from '../../app-data/index';
import {
  useDropFiles,
  useLoadFileCollectionFromHash,
} from '../../app/hooks/file-loading';
import {
  MeasurementInfoPanel,
  MeasurementsPanel,
  MeasurementPanel,
  IvPlotView,
} from '../../app/index';
import {
  Accordion,
  DropZoneContainer,
  FullscreenToolbarButton,
  Header,
  SplitPane,
  Toolbar,
} from '../../components/index';
import { assert } from '../../utils/assert';

import { loadFiles } from './helpers/loadFiles';

const mainCss = {
  root: css`
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  bottom: css`
    display: flex;
    flex-direction: row;
    flex: 1;
  `,
  contents: css`
    width: 100%;
    height: 100%;
  `,
  measurement: css`
    padding: 5px;
    width: 100%;
    height: 100%;
  `,
  panels: css`
    width: 100%;
    height: 100%;
    flex: 1 1 0%;
  `,
};

export default function MainLayout() {
  const dispatch = useAppDispatch();
  const appState = useAppState();

  const measurement = getCurrentMeasurementData(appState);
  assert(!measurement || measurement.kindAndId.kind === 'iv');

  useLoadFileCollectionFromHash(loadFiles);
  const onDrop = useDropFiles(loadFiles);

  return (
    <div css={mainCss.root}>
      <Header>
        <Toolbar orientation="horizontal">
          <div />
        </Toolbar>
        <Toolbar orientation="horizontal">
          <FullscreenToolbarButton />
        </Toolbar>
      </Header>
      <div css={mainCss.bottom}>
        <div>
          <Toolbar orientation="vertical">
            <div />
          </Toolbar>
        </div>
        <div css={mainCss.contents}>
          <SplitPane
            initialSize="400px"
            initialClosed={500}
            controlledSide="end"
          >
            <div css={mainCss.measurement}>
              <DropZoneContainer onDrop={onDrop}>
                {measurement ? (
                  <IvPlotView
                    measurement={measurement.data}
                    measurementDisplay={measurement.display}
                  />
                ) : null}
              </DropZoneContainer>
            </div>
            <div css={mainCss.panels}>
              <Accordion>
                <Accordion.Item title="Measurements" defaultOpened>
                  <MeasurementsPanel
                    measurements={appState.data.measurements}
                    onTabSelect={(kind) => {
                      dispatch({
                        type: 'SELECT_MEASUREMENT_KIND',
                        payload: kind,
                      });
                    }}
                    selectedMeasurement={measurement?.kindAndId}
                    onMeasurementSelect={({ measurement, kind }) => {
                      dispatch({
                        type: 'SELECT_MEASUREMENT',
                        payload: { id: measurement.id, kind },
                      });
                    }}
                  />
                </Accordion.Item>
                {measurement ? (
                  <Accordion.Item title="Measurement display" defaultOpened>
                    <MeasurementPanel
                      measurement={measurement.kindAndId}
                      measurementDisplay={measurement.display}
                    />
                  </Accordion.Item>
                ) : null}
                <Accordion.Item title="Measurement info" defaultOpened>
                  {measurement && (
                    <MeasurementInfoPanel measurement={measurement.data} />
                  )}
                </Accordion.Item>
              </Accordion>
            </div>
          </SplitPane>
        </div>
      </div>
    </div>
  );
}
