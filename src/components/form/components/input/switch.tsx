import { FormGroup, Switch as BPSwitch } from '@blueprintjs/core';
import type { ChangeEvent } from 'react';

import { useFieldContext } from '../../context/use_ts_form.js';
import { useErrors } from '../../utils/use_errors.js';
import { useInputId } from '../hooks/use_input_id.js';

interface SwitchProps {
  id?: string;
  label?: string;
}

export function Switch(props: SwitchProps) {
  const { label, id } = props;

  const field = useFieldContext<boolean>();
  const finalId = useInputId(id, field.name);
  const error = useErrors(field);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    field.handleChange(event.target.checked);

    return field.handleBlur();
  }

  return (
    <FormGroup
      helperText={error ?? undefined}
      label={label}
      labelFor={finalId}
      intent="danger"
      style={{ margin: 0, position: 'relative' }}
    >
      <BPSwitch
        checked={field.state.value}
        onChange={onChange}
        onBlur={field.handleBlur}
      />
    </FormGroup>
  );
}
