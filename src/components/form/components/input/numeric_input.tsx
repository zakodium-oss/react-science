import type { NumericInputProps as BPNumericInputProps } from '@blueprintjs/core';
import { FormGroup, NumericInput as BPNumericInput } from '@blueprintjs/core';

import { useFieldContext } from '../../context/use_ts_form.js';
import { useFieldId } from '../../utils/use_field_id.js';
import { getIntent } from '../../utils/use_intent.js';

interface NumericInputProps
  extends Omit<BPNumericInputProps, 'defaultValue' | 'name'> {
  label?: string;
  required?: boolean;
}

export function NumericInput(props: NumericInputProps) {
  const { label, required, ...rest } = props;
  const field = useFieldContext<string>();
  const id = useFieldId(field.name);
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
      helperText={error}
      label={label}
      labelFor={id}
      intent={intent}
      labelInfo={label && required && <span style={{ color: 'red' }}>*</span>}
    >
      <div style={{ display: 'flex' }}>
        <BPNumericInput
          {...rest}
          name={field.name}
          value={field.state.value ?? ''}
          onValueChange={onChange}
          intent={intent}
          required={required}
          id={id}
          onBlur={field.handleBlur}
        />
      </div>
    </FormGroup>
  );
}
