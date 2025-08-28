import { useFieldContext } from '../context/use_ts_form.js';
import { useErrors } from '../utils/use_errors.js';
import { useIntent } from '../utils/use_intent.js';

import { Select as FCSelect } from './form_components/select.js';
import type { SelectId } from './util/select.js';

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

  const field = useFieldContext<SelectOptionType['value']>();
  const error = useErrors(field);
  const intent = useIntent(error);

  function onItemSelect(selected: SelectId | undefined, option: unknown) {
    if (!option) return;
    return field.handleChange(option as SelectOptionType['value']);
  }

  return (
    <FCSelect
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
