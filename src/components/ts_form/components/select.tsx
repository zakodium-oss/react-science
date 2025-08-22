import type { SelectProps as BPSelectProps } from '@blueprintjs/select';
import { Select as BPSelect } from '@blueprintjs/select';

import { useFieldContext } from '../context/use_ts_form.js';
import { Label } from '../utils/Label.js';
import { useErrors } from '../utils/use_errors.js';
import { useFieldId } from '../utils/use_field_id.js';
import { useIntent } from '../utils/use_intent.js';

interface SelectProps<T>
  extends Omit<BPSelectProps<T>, 'onItemSelect' | 'inputProps'> {
  label?: string;
  required?: boolean;
  getValue: (item: T) => string;
}

export function Select<T>(props: SelectProps<T>) {
  const { label, required, getValue, ...rest } = props;
  const field = useFieldContext<T>();
  const id = useFieldId(field.name);
  const error = useErrors(field);
  const intent = useIntent(error);

  function onItemSelect(item: T) {
    return field.handleChange(item);
  }

  console.log(field.state.value);

  return (
    <Label
      error={error}
      label={label}
      labelFor={id}
      intent={intent}
      required={required}
    >
      <BPSelect
        {...rest}
        onItemSelect={onItemSelect}
        inputProps={{
          id,
          onBlur: field.handleBlur,
          intent,
          required,
          name: field.name,
        }}
      >
        {field.state.value ? getValue(field.state.value) : 'Select...'}
      </BPSelect>
    </Label>
  );
}
