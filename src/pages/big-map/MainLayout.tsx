import {
  getCurrentMeasurement,
  getSelectedMeasurement,
  useAppDispatch,
  useAppState,
} from '../../app-data/index';
import {
  MeasurementExplorer,
  MeasurementInfoPanel,
  MeasurementsPanel,
} from '../../app/index';
import {
  Accordion,
  DropZone,
  DropZoneContainer,
  FullscreenToolbarButton,
  Header,
  SplitPane,
  Toolbar,
} from '../../components/index';

export default function MainLayout() {
  const dispatch = useAppDispatch();
  const appState = useAppState();
  const measurement = getCurrentMeasurement(appState);

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
          <div />
        </Toolbar>
        <Toolbar orientation="horizontal">
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
            <div />
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
            <div
              style={{
                padding: 5,
                width: '100%',
                height: '100%',
              }}
            >
              {measurement ? (
                <DropZoneContainer>
                  <MeasurementExplorer
                    measurement={measurement}
                    width="100%"
                    height="100%"
                    kind={appState.view.selectedKind === 'mass' ? 'mass' : '1d'}
                  />
                </DropZoneContainer>
              ) : (
                <DropZone />
              )}
            </div>
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
                <Accordion.Item title="Info Panel">
                  {measurement && (
                    <MeasurementInfoPanel measurement={measurement} />
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
