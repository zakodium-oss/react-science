import { useFieldContext } from '../context/use_ts_form.js';
import { useErrors } from '../utils/use_errors.js';
import { useIntent } from '../utils/use_intent.js';

import type { SelectProps as FCSelectProps } from './form_components/select.js';
import { Select as FCSelect } from './form_components/select.js';

interface SelectOptionType {
  label: string;
  value: string;
}

type SelectProps = Omit<
  FCSelectProps<SelectOptionType, string>,
  'getLabel' | 'getValue'
>;

export function Select(props: SelectProps) {
  const { label, items, required, ...rest } = props;

  const field = useFieldContext<SelectOptionType['value']>();
  const error = useErrors(field);
  const intent = useIntent(error);

  function onItemSelect(item: SelectOptionType['value'] | undefined) {
    if (!item) return;
    return field.handleChange(item);
  }

  return (
    <FCSelect
      {...rest}
      label={label}
      items={items}
      selected={field.state.value}
      onChange={onItemSelect}
      intent={intent}
      required={required}
      helperText={error ?? undefined}
    />
  );
}
