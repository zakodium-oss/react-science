import { useFieldContext } from '../../context/use_ts_form.js';
import { getIntent } from '../../utils/use_intent.js';
import { FormGroup } from '../input_groups/form-group.js';
import { Select as SelectInput } from '../input_groups/select.js';
import type { SelectId } from '../util/select.js';

interface SelectOptionType {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  items: SelectOptionType[];
  required?: boolean;
  helperText?: string;
  fill?: boolean;
}

export function Select(props: SelectProps) {
  const { label, items, required, helperText, fill } = props;

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
      helpText={helperText}
      fill={fill}
      error={error}
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
