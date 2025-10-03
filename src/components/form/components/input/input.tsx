import { InputGroup } from '@blueprintjs/core';
import type { ChangeEvent } from 'react';

import { useFieldContext } from '../../context/use_ts_form.js';
import type { FormGroupInputProps } from '../input_groups/form_group.js';
import { FormGroup } from '../input_groups/form_group.js';

interface InputProps extends FormGroupInputProps {
  type?: string;
}

export function Input(props: InputProps) {
  const {
    label,
    required,
    placeholder,
    type = 'text',
    helpText,
    layout,
    fullWidth,
  } = props;

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
      layout={layout}
      fullWidth={fullWidth}
    >
      <InputGroup
        id={field.name}
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
