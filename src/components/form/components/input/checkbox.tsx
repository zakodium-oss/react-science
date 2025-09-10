import type { CheckboxProps as BPCheckboxProps } from '@blueprintjs/core';
import { Checkbox as BPCheckbox, FormGroup } from '@blueprintjs/core';
import type { ChangeEvent } from 'react';

import { useFieldContext } from '../../context/use_ts_form.js';
import { useErrors } from '../../utils/use_errors.js';
import { getIntent } from '../../utils/use_intent.js';

type CheckboxProps = Omit<BPCheckboxProps, 'defaultChecked' | 'name'>;

export function Checkbox(props: CheckboxProps) {
  const { ...rest } = props;
  const field = useFieldContext<boolean>();
  const error = useErrors(field);
  const intent = getIntent(error);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    return field.handleChange(checked);
  }

  return (
    <FormGroup intent={intent} helperText={error}>
      <BPCheckbox
        {...rest}
        name={field.name}
        value={String(field.state.value)}
        onChange={onChange}
        onBlurCapture={field.handleBlur}
      />
    </FormGroup>
  );
}
