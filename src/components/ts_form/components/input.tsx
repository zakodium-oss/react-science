import type { InputGroupProps } from '@blueprintjs/core';
import { InputGroup } from '@blueprintjs/core';
import type { ChangeEvent } from 'react';
import { useId, useMemo } from 'react';

import { useFieldContext } from '../context/use_ts_form.js';
import { Label } from '../utils/Label.js';

interface InputProps extends Omit<InputGroupProps, 'defaultValue' | 'name'> {
  label?: string;
}

export function Input(props: InputProps) {
  const { label, required, ...rest } = props;
  const field = useFieldContext<string>();
  const id = `input-${field.name}-${useId()}`;

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    return field.handleChange(event.target.value);
  }

  const error = useMemo<string | undefined>(() => {
    const error = field.state.meta.errors.find((e) => e.path[0] === field.name);
    return error?.message || undefined;
  }, [field.name, field.state.meta.errors]);

  const intent = useMemo(() => {
    return error !== undefined ? 'danger' : undefined;
  }, [error]);

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
