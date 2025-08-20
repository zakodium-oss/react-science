import type { InputGroupProps } from '@blueprintjs/core';
import { Classes, FormGroup, InputGroup } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';
import { useMemo } from 'react';

import { useFieldContext } from '../context/use_ts_form.js';

type InputProps = Omit<InputGroupProps, 'defaultValue' | 'name'>;

const StyledInput = styled(InputGroup)<{ error: boolean }>`
  .${Classes.INPUT} {
    border: 1px solid ${(props) => (props.error ? 'red' : 'inherit')};
  }
`;

export function Input(props: InputProps) {
  const field = useFieldContext<string>();

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    return field.handleChange(event.target.value);
  }

  const error = useMemo<string | undefined>(() => {
    const error = field.state.meta.errors.find((e) => e.path[0] === field.name);
    return error?.message || undefined;
  }, [field.name, field.state.meta.errors]);

  return (
    <FormGroup color="red" helperText={error}>
      <StyledInput
        {...props}
        name={field.name}
        value={field.state.value}
        onChange={onChange}
        error={error !== undefined}
      />
    </FormGroup>
  );
}
