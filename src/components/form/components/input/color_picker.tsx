import type { ChangeCallbackProps as ChangeCallbackComponentProps } from '../../../color-picker/react-color/ColorPicker.js';
import { useFieldContext } from '../../context/use_ts_form.js';
import type { FormGroupInputProps } from '../input_groups/form_group.js';
import { FormGroup } from '../input_groups/form_group.js';
import { ColorPickerDropdown } from '../../../color-picker/index.js';

type ColorPickerProps = Omit<FormGroupInputProps, 'placeholder'>;

export function ColorPicker(props: ColorPickerProps) {
  const { label, helpText, layout, fullWidth, required } = props;
  const field = useFieldContext<string>();
  const error = field
    .getMeta()
    .errors.map((e) => e.message)
    .at(0);

  function onChange(color: ChangeCallbackComponentProps) {
    field.setValue(color.hex);
  }

  return (
    <FormGroup
      name={field.name}
      label={label}
      helpText={helpText}
      error={error}
      layout={layout}
      fullWidth={fullWidth}
      required={required}
      intent={error ? 'danger' : 'none'}
    >
      <ColorPickerDropdown
        color={{ hex: field.state.value }}
        onChange={onChange}
      />
    </FormGroup>
  );
}
