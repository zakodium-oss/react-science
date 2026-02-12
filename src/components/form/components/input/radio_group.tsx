import type { RadioGroupProps as BPRadioGroupProps } from '@blueprintjs/core';
import { RadioGroup as BPRadioGroup } from '@blueprintjs/core';
import type { FormEvent } from 'react';

import { useFieldContext } from '../../context/use_ts_form.ts';
import { useFormContext } from '../input_groups/form_context.ts';
import type { FormGroupInputProps } from '../input_groups/index.ts';
import { FormGroup } from '../input_groups/index.ts';

interface RadioGroupProps
  extends
    Omit<FormGroupInputProps, 'placeholder'>,
    Omit<
      BPRadioGroupProps,
      | keyof FormGroupInputProps
      | 'onChange'
      | 'id'
      | 'name'
      | 'onBlur'
      | 'selectedValue'
    > {}

/**
 * Default inline to true if the final layout (`layout ?? formLayout`) is 'inline'
 * If you need to override this, set `inline={false}`.
 *
 * @param props
 */
export function RadioGroup(props: RadioGroupProps) {
  const { label, required, helpText, layout, fullWidth, ...radioGroupProps } =
    props;

  const { layout: formLayout } = useFormContext();
  const finalLayout = layout ?? formLayout;
  const overridableRadioGroupProps: Pick<BPRadioGroupProps, 'inline'> =
    finalLayout === 'inline' ? { inline: true } : {};

  const field = useFieldContext<string>();
  const error = field
    .getMeta()
    .errors.map((e) => e.message)
    .at(0);

  function onChange(event: FormEvent<HTMLInputElement>) {
    return field.handleChange(event.currentTarget.value);
  }

  return (
    <FormGroup
      name={field.name}
      label={label}
      intent={error ? 'danger' : 'none'}
      required={required}
      error={error}
      helpText={helpText}
      layout={layout}
      fullWidth={fullWidth}
    >
      <BPRadioGroup
        {...overridableRadioGroupProps}
        {...radioGroupProps}
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        selectedValue={field.state.value}
        onChange={onChange}
      />
    </FormGroup>
  );
}
