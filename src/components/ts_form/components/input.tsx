import type { InputGroupProps } from '@blueprintjs/core';
import type { ChangeEvent } from 'react';

import { Input as FCInput } from '../components/form_components/input.js';
import { useFieldContext } from '../context/use_ts_form.js';
import { useErrors } from '../utils/use_errors.js';
import { useIntent } from '../utils/use_intent.js';

interface InputProps extends Omit<InputGroupProps, 'defaultValue' | 'name'> {
  label?: string;
  inline?: boolean;
}

export function Input(props: InputProps) {
  const { label, required, inline, ...rest } = props;
  const field = useFieldContext<string>();
  const error = useErrors(field);
  const intent = useIntent(error);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    return field.handleChange(event.target.value);
  }

  return (
    <FCInput
      {...rest}
      label={label}
      value={field.state.value}
      onChange={onChange}
      inline={inline}
      intent={intent}
      required={required}
      error={error}
      onBlur={field.handleBlur}
    />
  );
}
