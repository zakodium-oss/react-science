import { MeasurementDisplay, useAppDispatch } from '../../app-data/appState';
import type { MeasurementKindAndId } from '../../app-data/data.helpers';
import { ColorPicker } from '../../components/index';

export function MeasurementPanel(props: {
  measurementDisplay: MeasurementDisplay;
  measurement: MeasurementKindAndId;
}) {
  const { measurement, measurementDisplay } = props;
  const dispatch = useAppDispatch();

  return (
    <div style={{ display: 'flex', padding: 8 }}>
      <div style={{ flex: '1 1 0' }}>Stroke color</div>
      <ColorPicker
        color={{
          hex: measurementDisplay.lineStroke,
        }}
        onChangeComplete={({ hex }) => {
          dispatch({
            type: 'CHANGE_MEASUREMENT_DISPLAY',
            payload: {
              measurement,
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
