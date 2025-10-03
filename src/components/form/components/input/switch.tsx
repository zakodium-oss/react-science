import { Switch as BPSwitch } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';

import { useFieldContext } from '../../context/use_ts_form.js';
import type { Layout } from '../input_groups/form.js';
import { FormGroup } from '../input_groups/form_group.js';

interface SwitchProps {
  label?: string;
  helpText?: string;
  fullWidth?: boolean;
  layout?: Layout;
}

const StyledSwitch = styled(BPSwitch)`
  margin: 0 !important;
  height: 30px;
  display: flex;
  align-items: center;
`;

export function Switch(props: SwitchProps) {
  const { label, layout, helpText, fullWidth } = props;

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
      intent={error ? 'danger' : undefined}
      label={label}
      layout={layout}
      helpText={helpText}
      fullWidth={fullWidth}
    >
      <StyledSwitch
        name={field.name}
        id={field.name}
        checked={field.state.value}
        onChange={onChange}
        onBlur={field.handleBlur}
      />
    </FormGroup>
  );
}
