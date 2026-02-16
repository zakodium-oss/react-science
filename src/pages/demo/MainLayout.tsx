import { Spinner } from '@blueprintjs/core';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary } from 'react-error-boundary';
import { FaBook, FaMeteor } from 'react-icons/fa';
import { useKbsGlobal } from 'react-kbs';

import {
  AboutDialogToolbarButton,
  ExplorerPlotView,
  MeasurementConfigPanelAccordion,
  MeasurementInfoPanelAccordion,
  MeasurementsPanelAccordion,
  useDropFiles,
  useLoadFileCollectionFromHash,
} from '../../app/index.js';
import {
  download,
  getExistingMeasurementKinds,
  useAppState,
} from '../../app-data/index.js';
import {
  Accordion,
  DropZoneContainer,
  FifoLoggerToolbarItem,
  FullscreenToolbarButton,
  Header,
  SplitPane,
  Toolbar,
} from '../../components/index.js';

import { loadFiles } from './helpers/loadFiles.js';

function ErrorFallback(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;
  const message =
    error && typeof error === 'object' && 'message' in error
      ? error.message
      : null;
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{message as string}</pre>
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}

export default function MainLayout() {
  const appState = useAppState();

  const measurementKinds = getExistingMeasurementKinds(
    appState.data.measurements,
  );
  useLoadFileCollectionFromHash(loadFiles);
  const onDrop = useDropFiles(loadFiles);

  function saveHandler(filename = 'file', spaceIndent = 0) {
    const data = JSON.stringify(
      { data: appState.data, view: appState.view },
      (_key, value) =>
        ArrayBuffer.isView(value) && 'length' in value
          ? Array.from(value as Uint8Array)
          : value,
      spaceIndent,
    );
    const blob = new Blob([data], { type: 'text/plain' });
    download(blob, `${filename}.ium`);
  }
  useKbsGlobal([
    {
      shortcut: { key: 's', ctrl: true },
      handler() {
        saveHandler();
      },
    },
  ]);
  return (
    <>
      <Header>
        <Toolbar>
          <AboutDialogToolbarButton
            icon={<FaMeteor />}
            name="Logo"
            body={
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                vitae rerum laboriosam, quisquam deleniti quaerat culpa incidunt
                ipsum, laborum pariatur facere amet modi reprehenderit. Vero a
                corporis accusantium magnam aperiam!
              </p>
            }
          />
          <Toolbar.Item
            tooltip="Save as ium"
            icon="floppy-disk"
            onClick={() => saveHandler()}
          />
        </Toolbar>
        <Toolbar>
          <Toolbar.Item tooltip="User manual" icon={<FaBook />} />
          <FifoLoggerToolbarItem />
          <Toolbar.Item tooltip="General settings" icon="cog" />
          <FullscreenToolbarButton />
        </Toolbar>
      </Header>
      <div
        style={{
          flex: 1,
        }}
      >
        <SplitPane
          defaultSize="400px"
          closeThreshold={500}
          controlledSide="end"
        >
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              // reset the state of your app so the error doesn't happen again
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              {appState.load.isLoading ? (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Spinner />
                </div>
              ) : (
                <DropZoneContainer onDrop={onDrop}>
                  {measurementKinds.length > 0 ? <ExplorerPlotView /> : null}
                </DropZoneContainer>
              )}
            </div>
          </ErrorBoundary>
          <div
            style={{
              width: '100%',
              height: '100%',
              flex: '1 1 0%',
            }}
          >
            <Accordion>
              <MeasurementsPanelAccordion />
              <MeasurementInfoPanelAccordion />
              <MeasurementConfigPanelAccordion />
            </Accordion>
          </div>
        </SplitPane>
      </div>
    </>
  );
}
