import {
  ColorConfig,
  getFirstSelectedMeasurementData,
  useAppDispatch,
  useAppState,
} from '../../../app-data/index';
import { ColorPickerDropdown } from '../../../components/index';

export function MeasurementConfigPanel() {
  const dispatch = useAppDispatch();
  const appState = useAppState();

  const firstMeasurement = getFirstSelectedMeasurementData(appState);
  if (!firstMeasurement) {
    return null;
  }

  return (
    <div>
      <StrokeColorModifier
        color={firstMeasurement.display.color}
        onChange={(color) => {
          dispatch({
            type: 'CHANGE_MEASUREMENTS_DISPLAY',

            payload: { display: { color } },
          });
        }}
      />
    </div>
  );
}

interface StrokeColorModifierProps {
  color: ColorConfig;
  onChange: (color: ColorConfig) => void;
}

function StrokeColorModifier(props: StrokeColorModifierProps) {
  const { color, onChange } = props;

  if (color.kind === 'fixedGradient') {
    throw new Error('fixedGradient not supported yet');
  }

  return (
    <div style={{ display: 'flex', padding: 8 }}>
      <div style={{ flex: '1 1 0' }}>Stroke color</div>
      <div style={{ flex: '1 1 0' }}>
        {/* <SelectColorKind
          colorKind="fixed"
          onChange={(kind) => {
            if (kind === 'fixed') {
              onChange({ kind: 'fixed', color: 'black' });
            } else {
              onChange({ kind: 'fixedGradient', gradient: 'inferno' });
            }
          }}
        /> */}
        {color.kind === 'fixed' && (
          <ColorPickerDropdown
            color={{ hex: color.color }}
            onChangeComplete={({ hex }) =>
              onChange({ kind: 'fixed', color: hex })
            }
          />
        )}
      </div>
    </div>
  );
}

// interface SelectColorKindProps {
//   colorKind: ColorConfig['kind'];
//   onChange: (colorKind: ColorConfig['kind']) => void;
// }

// const colorKindOptions: { value: ColorConfig['kind']; label: string }[] = [
//   { value: 'fixed', label: 'Fixed' },
//   { value: 'fixedGradient', label: 'Fixed gradient' },
// ];
// function SelectColorKind(props: SelectColorKindProps) {
//   const { colorKind, onChange } = props;
//   return (
//     <select
//       value={colorKind}
//       onChange={(event) => {
//         onChange(event.target.value as ColorConfig['kind']);
//       }}
//     >
//       {colorKindOptions.map(({ value, label }) => (
//         <option key={value} value={value}>
//           {label}
//         </option>
//       ))}
//     </select>
//   );
// }
