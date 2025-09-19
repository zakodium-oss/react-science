import { FormGroup, InputGroup } from '@blueprintjs/core';
import type { ChangeEvent } from 'react';

import { useFieldContext } from '../../context/use_ts_form.js';

interface InputProps {
  label?: string;
  inline?: boolean;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

export function Input(props: InputProps) {
  const { label, required, inline, placeholder, type = 'text' } = props;
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
      helperText={error ?? undefined}
      label={label}
      intent="danger"
      style={{ margin: 0, position: 'relative' }}
      inline={inline}
      labelInfo={required && <span style={{ color: 'red' }}>*</span>}
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
