import type { InputGroupProps } from '@blueprintjs/core';
import { InputGroup } from '@blueprintjs/core';
import type { ChangeEvent } from 'react';

import { useFieldContext } from '../context/use_ts_form.js';
import { Label } from '../utils/Label.js';
import { useErrors } from '../utils/use_errors.js';
import { useFieldId } from '../utils/use_field_id.js';
import { useIntent } from '../utils/use_intent.js';

interface InputProps extends Omit<InputGroupProps, 'defaultValue' | 'name'> {
  label?: string;
}

export function Input(props: InputProps) {
  const { label, required, ...rest } = props;
  const field = useFieldContext<string>();
  const id = useFieldId(field.name);
  const error = useErrors(field);
  const intent = useIntent(error);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    return field.handleChange(event.target.value);
  }

  return (
    <Label
      error={error}
      label={label}
      labelFor={id}
      intent={intent}
      required={required}
    >
      <InputGroup
        {...rest}
        onBlur={field.handleBlur}
        name={field.name}
        value={field.state.value}
        onChange={onChange}
        intent={intent}
        required={required}
        id={id}
      />
    </Label>
  );
}
