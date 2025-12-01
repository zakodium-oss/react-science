import type { CheckboxProps as BPCheckboxProps } from '@blueprintjs/core';
import { Checkbox as BPCheckbox } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';

import { useFieldContext } from '../../context/use_ts_form.js';
import { getIntent } from '../../utils/use_intent.js';
import { FormGroup } from '../input_groups/form_group.js';

type CheckboxProps = Omit<BPCheckboxProps, 'defaultChecked' | 'name'> & {
  helpText?: string;
};

// Keep the margin top for space between inputs. But remove the margin bottom for helperText
const StyledCheckbox = styled(BPCheckbox)<CheckboxProps>`
  margin-bottom: 0 !important;
  width: fit-content;
`;

export function Checkbox(props: CheckboxProps) {
  const { helpText, label, ...otherProps } = props;
  const field = useFieldContext<boolean>();
  const error = field
    .getMeta()
    .errors.map((e) => e.message)
    .at(0);

  const intent = getIntent(error);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    return field.handleChange(checked);
  }

  return (
    <FormGroup
      name={field.name}
      intent={intent}
      error={error}
      fullWidth
      helpText={helpText}
    >
      <StyledCheckbox
        {...otherProps}
        label={label}
        name={field.name}
        value={String(field.state.value)}
        onChange={onChange}
        onBlur={field.handleBlur}
        defaultChecked={field.state.value}
      />
    </FormGroup>
  );
}
