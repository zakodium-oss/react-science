import { NumericInput as BPNumericInput } from '@blueprintjs/core';

import { useFieldContext } from '../../context/use_ts_form.js';
import { getIntent } from '../../utils/use_intent.js';
import type { FormGroupInputProps } from '../input_groups/form-group.js';
import { FormGroup } from '../input_groups/form-group.js';

interface NumericInputProps extends FormGroupInputProps {
  step?: number;
  min?: number;
  max?: number;
}

export function NumericInput(props: NumericInputProps) {
  const { label, required, helpText, fill, placeholder, step, min, max } =
    props;
  const field = useFieldContext<string>();
  const error = field
    .getMeta()
    .errors.map((e) => e.message)
    .at(0);

  const intent = getIntent(error);

  function onChange(_: number, valueAsString: string) {
    return field.handleChange(valueAsString);
  }

  return (
    <FormGroup
      name={field.name}
      label={label}
      intent={intent}
      required={required}
      helpText={helpText}
      fill={fill}
      error={error}
    >
      <BPNumericInput
        id={field.name}
        name={field.name}
        stepSize={step}
        min={min}
        max={max}
        value={field.state.value ?? ''}
        onValueChange={onChange}
        intent={intent}
        placeholder={placeholder}
        required={required}
      />
    </FormGroup>
  );
}
