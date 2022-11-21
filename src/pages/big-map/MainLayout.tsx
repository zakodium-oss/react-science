/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaInfo } from 'react-icons/fa';

import { getCurrentMeasurementData, useAppState } from '../../app-data/index';
import {
  IvPlotView,
  useDropFiles,
  useLoadFileCollectionFromHash,
  MeasurementsPanelAccordion,
  MeasurementInfoPanelAccordion,
  MeasurementConfigPanelAccordion,
  AboutDialogToolbarButton,
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
          <AboutDialogToolbarButton
            name="test"
            icon={<FaInfo />}
            body={<AboutInformation />}
          />
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
                {measurement ? <IvPlotView /> : null}
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

const aboutInformationCss = {
  root: css`
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
  `,
  link: css`
    color: rgb(150, 150, 150);
    &:hover {
      color: rgb(0, 188, 212);
    }
  `,
  separator: css`
    border-bottom: 1px solid gray;
    width: 15px;
    height: 1px;
    margin: 10px 0px;
  `,
};

function AboutInformation() {
  return (
    <div css={aboutInformationCss.root}>
      <p>LOGO</p>
      <div>
        <p>Version</p>
        <a
          css={aboutInformationCss.link}
          href="https://github.com/zakodium-oss/analysis-ui-components"
        >
          HEAD
        </a>
      </div>
      <span css={aboutInformationCss.separator} />
      <a
        css={aboutInformationCss.link}
        href="https://github.com/zakodium-oss/analysis-ui-components"
      >
        GitHub ( https://github.com/zakodium-oss/analysis-ui-components )
      </a>
      <span css={aboutInformationCss.separator} />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, officiis
        saepe natus illo tenetur eaque porro nihil reprehenderit magnam ipsa
        ipsam dolores ipsum? Ad vero eos, consequuntur voluptatum incidunt
        voluptatem.
      </p>
    </div>
  );
}
