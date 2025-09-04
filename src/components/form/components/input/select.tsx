import { useFieldContext } from '../../context/use_ts_form.js';
import { useErrors } from '../../utils/use_errors.js';
import { getIntent } from '../../utils/use_intent.js';
import { Select as FormGroupSelect } from '../input_groups/select.js';
import type { SelectId } from '../util/select.js';

interface SelectOptionType {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  items: SelectOptionType[];
  required?: boolean;
}

export function Select(props: SelectProps) {
  const { label, items, required } = props;

  const field = useFieldContext<SelectId>();
  const error = useErrors(field);
  const intent = getIntent(error);

  function onItemSelect(selected: SelectId | undefined) {
    if (!selected) return;
    return field.handleChange(selected);
  }

  return (
    <FormGroupSelect
      formGroupProps={{
        required,
        label,
        intent,
        helperText: error ?? undefined,
      }}
      selectProps={{ items, onChange: onItemSelect }}
      selected={field.state.value}
    />
  );
}
