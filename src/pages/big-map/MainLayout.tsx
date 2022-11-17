/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { getCurrentMeasurementData, useAppState } from '../../app-data/index';
import {
  IvPlotView,
  useDropFiles,
  useLoadFileCollectionFromHash,
  MeasurementsPanelAccordion,
  MeasurementInfoPanelAccordion,
  MeasurementConfigPanelAccordion,
} from '../../app/index';
import {
  Accordion,
  DropZoneContainer,
  FullscreenToolbarButton,
  Header,
  SplitPane,
  Toolbar,
  assert,
} from '../../components/index';

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
                <MeasurementsPanelAccordion />
                <MeasurementConfigPanelAccordion />
                <MeasurementInfoPanelAccordion />
              </Accordion>
            </div>
          </SplitPane>
        </div>
      </div>
    </div>
  );
}
