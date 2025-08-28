import type { InputGroupProps } from '@blueprintjs/core';
import { FormGroup, InputGroup } from '@blueprintjs/core';

import { useInputId } from '../hooks/use_input_id.js';

interface InputProps extends InputGroupProps {
  error?: string;
  label?: string;
  inline?: boolean;
  required?: boolean;
}

export function Input(props: InputProps) {
  const {
    defaultValue,
    required,
    error,
    onChange,
    onBlur,
    className,
    id,
    name,
    label,
    inline,
    type,
    inputClassName,
    ...otherProps
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
        {...otherProps}
        id={finalId}
        name={name}
        required={required}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        intent={error ? 'danger' : 'none'}
      />
    </FormGroup>
  );
}
