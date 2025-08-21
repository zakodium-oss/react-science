import type { NumericInputProps as BPNumericInputProps } from '@blueprintjs/core';
import { NumericInput as BPNumericInput } from '@blueprintjs/core';
import { useId, useMemo } from 'react';

import { useFieldContext } from '../context/use_ts_form.js';
import { Label } from '../utils/Label.js';

interface NumericInputProps
  extends Omit<BPNumericInputProps, 'defaultValue' | 'name'> {
  label?: string;
  required?: boolean;
}

export function NumericInput(props: NumericInputProps) {
  const { label, required, ...rest } = props;
  const field = useFieldContext<number>();
  const id = `input-${field.name}-${useId()}`;

  function onChange(value: number) {
    return field.handleChange(value);
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
      <BPNumericInput
        {...rest}
        onBlur={field.handleBlur}
        name={field.name}
        value={field.state.value}
        onValueChange={onChange}
        intent={intent}
        required={required}
        id={id}
      />
    </Label>
  );
}
