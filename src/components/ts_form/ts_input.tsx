import type { InputGroupProps } from '@blueprintjs/core';
import { InputGroup } from '@blueprintjs/core';
import type { ChangeEvent } from 'react';
import { useCallback } from 'react';

import { useFieldContext } from './context/use_ts_form.js';

type TSInputProps = InputGroupProps;

export function TSInput(props: TSInputProps) {
  const field = useFieldContext<string>();

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      return field.handleChange(event.target.value);
    },
    [field],
  );

  return (
    <InputGroup
      {...props}
      name={field.name}
      value={field.state.value}
      onChange={onChange}
    />
  );
}
