import type { NumericInputProps as BPNumericInputProps } from '@blueprintjs/core';
import { NumericInput as BPNumericInput } from '@blueprintjs/core';

import { useFieldContext } from '../context/use_ts_form.js';
import { Label } from '../utils/Label.js';
import { useErrors } from '../utils/use_errors.js';
import { useFieldId } from '../utils/use_field_id.js';
import { useIntent } from '../utils/use_intent.js';

interface NumericInputProps
  extends Omit<BPNumericInputProps, 'defaultValue' | 'name'> {
  label?: string;
  required?: boolean;
}

export function NumericInput(props: NumericInputProps) {
  const { label, required, ...rest } = props;
  const field = useFieldContext<number>();
  const id = useFieldId(field.name);
  const error = useErrors(field);
  const intent = useIntent(error);

  function onChange(value: number) {
    return field.handleChange(value);
  }

  return (
    <Label
      error={error}
      label={label}
      labelFor={id}
      intent={intent}
      required={required}
    >
      <BPNumericInput
        {...rest}
        onBlur={field.handleBlur}
        name={field.name}
        value={field.state.value}
        onValueChange={onChange}
        intent={intent}
        required={required}
        id={id}
      />
    </Label>
  );
}
