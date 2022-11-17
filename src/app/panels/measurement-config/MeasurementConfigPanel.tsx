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

  const { color } = measurement.display;

  if (color.kind !== 'fixed') {
    throw new Error(`unimplemented color edition for kind ${color.kind}`);
  }

  return (
    <div style={{ display: 'flex', padding: 8 }}>
      <div style={{ flex: '1 1 0' }}>Stroke color</div>
      <ColorPicker
        color={{
          hex: color.color,
        }}
        onChangeComplete={({ hex }) => {
          dispatch({
            type: 'CHANGE_MEASUREMENT_DISPLAY',
            payload: {
              measurement: measurement.kindAndId,
              display: {
                color: {
                  kind: 'fixed',
                  color: hex,
                },
              },
            },
          });
        }}
      />
    </div>
  );
}
