import { fileCollectionFromWebservice } from 'filelist-utils';
import { useEffect } from 'react';
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
  getCurrentMeasurementData,
  getSelectedMeasurement,
  useAppDispatch,
  useAppState,
} from '../../app-data/index';
import {
  MeasurementExplorer,
  MeasurementInfoPanel,
  MeasurementsPanel,
  MeasurementPanel,
} from '../../app/index';
import {
  Accordion,
  DropZoneContainer,
  FullscreenToolbarButton,
  Header,
  SplitPane,
  Toolbar,
  useHashSearchParams,
} from '../../components/index';

import { useLoadFiles } from './hooks/useLoadFiles';

function ErrorFallback({ error, resetErrorBoundary }) {
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

export default function DropZoneArea() {
  const dispatch = useAppDispatch();
  const appState = useAppState();
  const measurement = getCurrentMeasurementData(appState);
  const hashSearchParams = useHashSearchParams();
  const fileListParam = hashSearchParams.get('filelist');
  const loadFiles = useLoadFiles();

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
  useEffect(() => {
    async function getData(url: string | null) {
      if (url) {
        const fileCollection = await fileCollectionFromWebservice(url);
        loadFiles(fileCollection);
      }
    }
    void getData(fileListParam);
  }, [loadFiles, fileListParam]);
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
          <Toolbar.Item titleOrientation="horizontal" title="Logo">
            <FaMeteor />
          </Toolbar.Item>
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
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
        }}
      >
        <div>
          <Toolbar orientation="vertical">
            <Toolbar.Item title="Glasses" active>
              <FaGlasses />
            </Toolbar.Item>
            <Toolbar.Item title="Open in large mode">
              <FaTabletAlt />
            </Toolbar.Item>
          </Toolbar>
        </div>
        <div
          style={{
            width: '100%',
            maxHeight: '100%',
          }}
        >
          <SplitPane
            initialSize="400px"
            initialClosed={500}
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
                  padding: 5,
                  width: '100%',
                  height: '100%',
                }}
              >
                <DropZoneContainer onDrop={loadFiles}>
                  {measurement ? (
                    <MeasurementExplorer
                      measurementDisplay={measurement.display}
                      measurement={measurement.data}
                      width="100%"
                      height="100%"
                      kind={
                        appState.view.selectedKind === 'mass' ? 'mass' : '1d'
                      }
                    />
                  ) : null}
                </DropZoneContainer>
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
                <Accordion.Item title="Measurement" defaultOpened>
                  <div
                    style={{
                      flex: '1 1 0%',
                      width: '100%',
                    }}
                  >
                    <MeasurementsPanel
                      measurements={appState.data.measurements}
                      onTabSelect={(kind) => {
                        dispatch({
                          type: 'SELECT_MEASUREMENT_KIND',
                          payload: kind,
                        });
                      }}
                      selectedMeasurement={getSelectedMeasurement(appState)}
                      onMeasurementSelect={({ measurement, kind }) => {
                        dispatch({
                          type: 'SELECT_MEASUREMENT',
                          payload: { id: measurement.id, kind },
                        });
                      }}
                    />
                  </div>
                </Accordion.Item>
                {measurement ? (
                  <Accordion.Item title="Measurement display">
                    <MeasurementPanel
                      measurement={measurement.kindAndId}
                      measurementDisplay={measurement.display}
                    />
                  </Accordion.Item>
                ) : null}
                <Accordion.Item title="Info Panel">
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
