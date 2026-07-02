import { useFieldContext } from '../../context/use_ts_form.js';
import { getIntent } from '../../utils/use_intent.js';
import type { FormGroupInputProps } from '../input_groups/form_group.js';
import { FormGroup } from '../input_groups/form_group.js';
import type { RealSelectProps } from '../input_groups/select.js';
import { Select as SelectInput } from '../input_groups/select.js';
import type { SelectId } from '../util/select.js';

export interface SelectOptionType {
  label: string;
  value: SelectId;
}

/**
 * Props for `form.Select` component
 */
export interface SelectProps
  extends
    Omit<FormGroupInputProps, 'placeholder'>,
    Pick<
      RealSelectProps<SelectOptionType, SelectId>,
      'disabled' | 'filterable' | 'renderButton'
    > {
  items: SelectOptionType[];
}

export function Select(props: SelectProps) {
  const {
    label,
    items,
    required,
    helpText,
    layout,
    fullWidth,
    disabled,
    filterable,
    renderButton,
  } = props;

  const field = useFieldContext<SelectId | undefined>();
  const error = field
    .getMeta()
    .errors.map((e) => e.message)
    .at(0);

  const intent = getIntent(error);

  function onItemSelect(selected: SelectId | undefined) {
    return field.handleChange(selected);
  }

  return (
    <FormGroup
      name={field.name}
      required={required}
      label={label}
      intent={intent}
      helpText={helpText}
      error={error}
      layout={layout}
      fullWidth={fullWidth}
    >
      <SelectInput
        onBlur={field.handleBlur}
        items={items}
        selected={field.state.value}
        onChange={onItemSelect}
        intent={intent}
        name={field.name}
        disabled={disabled}
        filterable={filterable}
        renderButton={renderButton}
      />
    </FormGroup>
  );
}
