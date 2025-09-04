import { FormGroup, InputGroup } from '@blueprintjs/core';
import type { ChangeEvent } from 'react';

import { useInputId } from '../hooks/use_input_id.js';

interface InputProps {
  error?: string;
  required?: boolean;
  id?: string;
  name: string;
  type?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  value: string;
  placeholder?: string;
  formGroupProps: {
    label?: string;
    className?: string;
    inline?: boolean;
  };
}

export function Input(props: InputProps) {
  const {
    id,
    required = false,
    error,
    formGroupProps: { className, inline = false, label },
    name,
    onBlur,
    onChange,
    type = 'text',
    value,
    placeholder,
  } = props;

  const finalId = useInputId(id, name);

  return (
    <FormGroup
      helperText={error ?? undefined}
      label={label}
      labelFor={finalId}
      intent="danger"
      style={{ margin: 0, position: 'relative' }}
      className={className}
      inline={inline}
      labelInfo={required && <span style={{ color: 'red' }}>*</span>}
    >
      <InputGroup
        id={finalId}
        name={name}
        required={required}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        intent={error ? 'danger' : 'none'}
        value={value}
        placeholder={placeholder}
      />
    </FormGroup>
  );
}
