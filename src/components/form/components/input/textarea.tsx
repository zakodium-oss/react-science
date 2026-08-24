import type { TextAreaProps as BPTextAreaProps } from '@blueprintjs/core';
import { TextArea as BPTextArea } from '@blueprintjs/core';
import type { ChangeEvent } from 'react';

import { useFieldContext } from '../../context/use_ts_form.ts';
import type { FormGroupInputProps } from '../input_groups/index.ts';
import { FormGroup } from '../input_groups/index.ts';

interface TextAreaProps extends FormGroupInputProps, BPTextAreaProps {}

export function TextArea(props: TextAreaProps) {
  const { label, required, helpText, layout, fullWidth, ...otherProps } = props;

  const field = useFieldContext<string>();
  const error = field
    .getMeta()
    .errors.map((e) => e.message)
    .at(0);

  function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    return field.handleChange(event.target.value);
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
      <BPTextArea
        {...otherProps}
        id={field.name}
        name={field.name}
        onChange={onChange}
        onBlur={field.handleBlur}
        intent={error ? 'danger' : 'none'}
        value={field.state.value}
        required={required}
      />
    </FormGroup>
  );
}
