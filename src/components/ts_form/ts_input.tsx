import type { InputGroupProps } from '@blueprintjs/core';
import { Classes, InputGroup } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';
import { useCallback, useMemo } from 'react';

import { useFieldContext } from './context/use_ts_form.js';

type TSInputProps = Omit<InputGroupProps, 'defaultValue' | 'name'>;

const Error = styled.p`
  color: red;
`;

const Input = styled(InputGroup)<{ error: boolean }>`
  .${Classes.INPUT} {
    border: 1px solid ${(props) => (props.error ? 'red' : 'inherit')};
  }
`;

export function TSInput(props: TSInputProps) {
  const field = useFieldContext<string>();

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      return field.handleChange(event.target.value);
    },
    [field],
  );

  const error = useMemo<string | undefined>(() => {
    const error = field.state.meta.errors.find((e) => e.path[0] === field.name);
    return error?.message || undefined;
  }, [field.name, field.state.meta.errors]);

  return (
    <>
      <Input
        {...props}
        name={field.name}
        value={field.state.value}
        onChange={onChange}
        error={error !== undefined}
      />

      {error && <Error>{error}</Error>}
    </>
  );
}
