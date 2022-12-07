import { ErrorBoundary } from 'react-error-boundary';
import {
  FaBook,
  FaCogs,
  FaGlasses,
  FaMeteor,
  FaSave,
  FaTabletAlt,
} from 'react-icons/fa';
import { useKbsGlobal } from 'react-kbs';

import {
  download,
  getExistingMeasurementKinds,
  useAppState,
} from '../../app-data/index';
import {
  MeasurementsPanelAccordion,
  ExplorerPlotView,
  useLoadFileCollectionFromHash,
  useDropFiles,
  MeasurementInfoPanelAccordion,
  MeasurementConfigPanelAccordion,
  AboutDialogToolbarButton,
} from '../../app/index';
import {
  Accordion,
  DropZoneContainer,
  FullscreenToolbarButton,
  FullSpinner,
  Header,
  SplitPane,
  Toolbar,
} from '../../components/index';

import { loadFiles } from './helpers/loadFiles';

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
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
        ArrayBuffer.isView(value) ? Array.from(value as any) : value,
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
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header>
        <Toolbar orientation="horizontal">
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
            titleOrientation="horizontal"
            title="Save as ium"
            onClick={() => saveHandler()}
          >
            <FaSave />
          </Toolbar.Item>
        </Toolbar>
        <Toolbar orientation="horizontal">
          <Toolbar.Item title="User manual">
            <FaBook />
          </Toolbar.Item>
          <Toolbar.Item title="General settings">
            <FaCogs />
          </Toolbar.Item>
          <FullscreenToolbarButton />
        </Toolbar>
      </Header>
      <div
        style={{
          flex: 1,
        }}
      >
        <SplitPane initialSize="400px" initialClosed={500} controlledSide="end">
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              // reset the state of your app so the error doesn't happen again
            }}
          >
            <div
              style={{
                padding: 5,
                width: '100%',
                height: '100%',
              }}
            >
              {appState.load.isLoading ? (
                <div style={{ width: '100%', height: '100%' }}>
                  <FullSpinner />
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
              <MeasurementConfigPanelAccordion />
              <MeasurementInfoPanelAccordion />
            </Accordion>
          </div>
        </SplitPane>
      </div>
    </div>
  );
}
