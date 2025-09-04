import type { ChangeEvent } from 'react';

import { useFieldContext } from '../../context/use_ts_form.js';
import { useErrors } from '../../utils/use_errors.js';
import { Input as FormGroupInput } from '../input_groups/input.js';

interface InputProps {
  label?: string;
  inline?: boolean;
  required?: boolean;
  placeholder?: string;
}

export function Input(props: InputProps) {
  const { label, required, inline, placeholder } = props;
  const field = useFieldContext<string>();
  const error = useErrors(field);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    return field.handleChange(event.target.value);
  }

  return (
    <FormGroupInput
      required={required}
      error={error}
      formGroupProps={{ label, inline }}
      value={field.state.value}
      onChange={onChange}
      onBlur={field.handleBlur}
      name={field.name}
      placeholder={placeholder}
    />
  );
}
