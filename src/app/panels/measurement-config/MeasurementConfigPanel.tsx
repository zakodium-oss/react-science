import {
  getCurrentMeasurementData,
  useAppDispatch,
  useAppState,
} from '../../../app-data/index';
import { ColorPicker } from '../../../components/index';

export function MeasurementConfigPanel() {
  const dispatch = useAppDispatch();
  const appState = useAppState();
  const measurement = getCurrentMeasurementData(appState);
  if (!measurement) return null;

  return (
    <div style={{ display: 'flex', padding: 8 }}>
      <div style={{ flex: '1 1 0' }}>Stroke color</div>
      <ColorPicker
        color={{
          hex: measurement.display.lineStroke,
        }}
        onChangeComplete={({ hex }) => {
          dispatch({
            type: 'CHANGE_MEASUREMENT_DISPLAY',
            payload: {
              measurement: measurement.kindAndId,
              display: {
                lineStroke: hex,
              },
            },
          });
        }}
      />
    </div>
  );
}
