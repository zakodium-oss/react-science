import { useFieldContext } from '../../context/use_ts_form.js';
import { getIntent } from '../../utils/use_intent.js';
import type { FormGroupInputProps } from '../input_groups/form-group.js';
import { FormGroup } from '../input_groups/form-group.js';
import { Select as SelectInput } from '../input_groups/select.js';
import type { SelectId } from '../util/select.js';

interface SelectOptionType {
  label: string;
  value: string;
}

interface SelectProps extends Omit<FormGroupInputProps, 'placeholder'> {
  items: SelectOptionType[];
}

export function Select(props: SelectProps) {
  const { label, items, required, helpText, fill, inline } = props;

  const field = useFieldContext<SelectId>();
  const error = field
    .getMeta()
    .errors.map((e) => e.message)
    .at(0);

  const intent = getIntent(error);

  function onItemSelect(selected: SelectId | undefined) {
    if (!selected) return;
    return field.handleChange(selected);
  }

  return (
    <FormGroup
      name={field.name}
      required={required}
      label={label}
      intent={intent}
      helpText={helpText}
      fill={fill}
      error={error}
      inline={inline}
    >
      <SelectInput
        onBlur={field.handleBlur}
        items={items}
        selected={field.state.value}
        onChange={onItemSelect}
        intent={intent}
      />
    </FormGroup>
  );
}
