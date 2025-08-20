import type { InputGroupProps } from '@blueprintjs/core';
import { Classes, FormGroup, InputGroup } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';
import { useId, useMemo } from 'react';

import { useFieldContext } from '../context/use_ts_form.js';

interface InputProps extends Omit<InputGroupProps, 'defaultValue' | 'name'> {
  label?: string;
}

const StyledInput = styled(InputGroup)<{ error: boolean }>`
  .${Classes.INPUT} {
    border: 1px solid ${(props) => (props.error ? 'red' : 'inherit')};
  }
`;

export function Input(props: InputProps) {
  const { label, required, ...rest } = props;
  const field = useFieldContext<string>();
  const id = useId();

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    return field.handleChange(event.target.value);
  }

  const error = useMemo<string | undefined>(() => {
    const error = field.state.meta.errors.find((e) => e.path[0] === field.name);
    return error?.message || undefined;
  }, [field.name, field.state.meta.errors]);

  return (
    <FormGroup
      helperText={error}
      label={label}
      labelInfo={required && <span style={{ color: 'red' }}>*</span>}
      labelFor={`input-${field.name}-${id}`}
      intent={error !== undefined ? 'danger' : undefined}
    >
      <StyledInput
        {...rest}
        name={field.name}
        value={field.state.value}
        onChange={onChange}
        error={error !== undefined}
        required={required}
        id={`input-${field.name}-${id}`}
      />
    </FormGroup>
  );
}
