import type { CheckboxProps as BPCheckboxProps } from '@blueprintjs/core';
import { Checkbox as BPCheckbox } from '@blueprintjs/core';

import { useFieldContext } from '../context/use_ts_form.js';
import { Error } from '../utils/Error.js';
import { useErrors } from '../utils/use_errors.js';
import { useIntent } from '../utils/use_intent.js';

type CheckboxProps = Omit<BPCheckboxProps, 'defaultChecked' | 'name'>;

export function Checkbox(props: CheckboxProps) {
  const { ...rest } = props;
  const field = useFieldContext<boolean>();
  const error = useErrors(field);
  const intent = useIntent(error);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    field.handleChange(checked);
  }

  return (
    <Error intent={intent} error={error}>
      <BPCheckbox
        {...rest}
        onBlur={field.handleBlur}
        name={field.name}
        value={String(field.state.value)}
        onChange={onChange}
      />
    </Error>
  );
}
