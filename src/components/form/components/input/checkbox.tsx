import type { CheckboxProps as BPCheckboxProps } from '@blueprintjs/core';
import { Checkbox as BPCheckbox, FormGroup } from '@blueprintjs/core';

import { useFieldContext } from '../../context/use_ts_form.js';
import { useErrors } from '../../utils/use_errors.js';
import { getIntent } from '../../utils/use_intent.js';

type CheckboxProps = Omit<BPCheckboxProps, 'defaultChecked' | 'name'>;

export function Checkbox(props: CheckboxProps) {
  const { ...rest } = props;
  const field = useFieldContext<boolean>();
  const error = useErrors(field);
  const intent = getIntent(error);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    field.handleChange(checked);

    return field.handleBlur();
  }

  return (
    <FormGroup intent={intent} helperText={error}>
      <BPCheckbox
        {...rest}
        onBlur={field.handleBlur}
        name={field.name}
        value={String(field.state.value)}
        onChange={onChange}
      />
    </FormGroup>
  );
}
