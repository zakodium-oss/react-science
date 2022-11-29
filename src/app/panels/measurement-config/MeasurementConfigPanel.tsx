import {
  getCurrentMeasurementData,
  getFirstSelectedMeasurementData,
  useAppDispatch,
  useAppState,
} from '../../../app-data/index';
import {
  assert,
  assertNotNull,
  ColorPickerDropdown,
} from '../../../components/index';

export function MeasurementConfigPanel() {
  const dispatch = useAppDispatch();
  const appState = useAppState();

  const {
    view: { selectedMeasurements, selectedKind },
  } = appState;
  assert(selectedKind);

  if ((selectedMeasurements[selectedKind] || []).length > 1) {
    const firstMeasurement = getFirstSelectedMeasurementData(appState);
    const color = firstMeasurement?.display.color;
    assertNotNull(color);

    if (color.kind !== 'fixed') {
      throw new Error(`unimplemented color edition for kind ${color.kind}`);
    }

    return (
      <StrokeColorModifier
        color={color.color}
        onChangeComplete={(hex) => {
          dispatch({
            type: 'CHANGE_MEASUREMENTS_DISPLAY',
            payload: { display: { color: { kind: 'fixed', color: hex } } },
          });
        }}
      />
    );
  }

  const measurement = getCurrentMeasurementData(appState);
  if (!measurement) return null;

  const { color } = measurement.display;

  if (color.kind !== 'fixed') {
    throw new Error(`unimplemented color edition for kind ${color.kind}`);
  }

  return (
    <StrokeColorModifier
      color={color.color}
      onChangeComplete={(hex) => {
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
  );
}

interface StrokeColorModifierProps {
  color: string;
  onChangeComplete: (hex: string) => void;
}

function StrokeColorModifier(props: StrokeColorModifierProps) {
  const { color, onChangeComplete } = props;

  return (
    <div style={{ display: 'flex', padding: 8 }}>
      <div style={{ flex: '1 1 0' }}>Stroke color</div>
      <div style={{ flex: '1 1 0' }}>
        <ColorPickerDropdown
          color={{ hex: color }}
          onChangeComplete={({ hex }) => onChangeComplete(hex)}
        />
      </div>
    </div>
  );
}
