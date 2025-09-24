import { Switch as BPSwitch } from '@blueprintjs/core';
import type { ChangeEvent } from 'react';

import { useFieldContext } from '../../context/use_ts_form.js';
import { FormGroup } from '../input_groups/form-group.js';

interface SwitchProps {
  label?: string;
  fill?: boolean;
  inline?: boolean;
}

export function Switch(props: SwitchProps) {
  const { label, fill = false, inline } = props;

  const field = useFieldContext<boolean>();
  const error = field
    .getMeta()
    .errors.map((e) => e.message)
    .at(0);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    return field.handleChange(event.target.checked);
  }

  return (
    <FormGroup
      name={field.name}
      error={error}
      intent="danger"
      label={label}
      fill={fill}
      inline={inline}
    >
      <BPSwitch
        name={field.name}
        id={field.name}
        checked={field.state.value}
        onChange={onChange}
        onBlur={field.handleBlur}
      />
    </FormGroup>
  );
}
