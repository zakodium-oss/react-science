import type { ChangeEvent } from 'react';

import { Input as FCInput } from '../components/form_components/input.js';
import { useFieldContext } from '../context/use_ts_form.js';
import { useErrors } from '../utils/use_errors.js';

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
    <FCInput
      required={required}
      error={error}
      formGroupProps={{ label, inline }}
      inputGroupProps={{
        value: field.state.value,
        onChange,
        onBlur: field.handleBlur,
        name: field.name,
        placeholder,
      }}
    />
  );
}
