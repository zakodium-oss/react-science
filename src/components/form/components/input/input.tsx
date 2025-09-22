import { InputGroup } from '@blueprintjs/core';
import type { ChangeEvent } from 'react';

import { useFieldContext } from '../../context/use_ts_form.js';
import { FormGroup } from '../input_groups/form-group.js';

interface InputProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  helpText?: string;
  fill?: boolean;
}

export function Input(props: InputProps) {
  const { label, required, placeholder, type = 'text', helpText, fill } = props;
  const field = useFieldContext<string>();
  const error = field
    .getMeta()
    .errors.map((e) => e.message)
    .at(0);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    return field.handleChange(event.target.value);
  }

  return (
    <FormGroup
      name={field.name}
      label={label}
      intent={error ? 'danger' : 'none'}
      required={required}
      error={error}
      helpText={helpText}
      fill={fill}
    >
      <InputGroup
        name={field.name}
        required={required}
        type={type}
        onChange={onChange}
        onBlur={field.handleBlur}
        intent={error ? 'danger' : 'none'}
        value={field.state.value}
        placeholder={placeholder}
      />
    </FormGroup>
  );
}
