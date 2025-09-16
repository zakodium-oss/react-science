import { FormGroup, Switch as BPSwitch } from '@blueprintjs/core';
import type { ChangeEvent } from 'react';

import { useFieldContext } from '../../context/use_ts_form.js';

interface SwitchProps {
  label?: string;
}

export function Switch(props: SwitchProps) {
  const { label } = props;

  const field = useFieldContext<boolean>();
  const error = field
    .getMeta()
    .errors.map((e) => e.message)
    .at(0);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    return field.handleChange(event.target.checked);
  }

  return (
    <FormGroup helperText={error ?? undefined} intent="danger">
      <BPSwitch
        checked={field.state.value}
        onChange={onChange}
        onBlur={field.handleBlur}
        labelElement={label}
        alignIndicator="end"
      />
    </FormGroup>
  );
}
