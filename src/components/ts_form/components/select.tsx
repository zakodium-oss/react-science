import type { SelectProps as BPSelectProps } from '@blueprintjs/select';
import { Select as BPSelect } from '@blueprintjs/select';
import { useState } from 'react';

import { Button } from '../../button/index.js';
import { useFieldContext } from '../context/use_ts_form.js';
import { Label } from '../utils/Label.js';
import { useErrors } from '../utils/use_errors.js';
import { useFieldId } from '../utils/use_field_id.js';
import { useIntent } from '../utils/use_intent.js';

interface SelectValue {
  label: string;
  value: string;
}

interface SelectProps
  extends Omit<BPSelectProps<SelectValue>, 'onItemSelect' | 'inputProps'> {
  label?: string;
  required?: boolean;
}

export function Select(props: SelectProps) {
  const { label, required, ...rest } = props;

  const [isOpen, setIsOpen] = useState(false);
  const field = useFieldContext<SelectValue>();
  const id = useFieldId(field.name);
  const error = useErrors(field);
  const intent = useIntent(error);

  function onItemSelect(item: SelectValue) {
    field.handleChange(item);
    return setIsOpen(false);
  }

  return (
    <Label
      error={error}
      label={label}
      labelFor={id}
      intent={intent}
      required={required}
      onClick={() => setIsOpen((old) => !old)}
    >
      <BPSelect
        {...rest}
        onItemSelect={onItemSelect}
        popoverProps={{
          isOpen,
          onClose: () => {
            setIsOpen(false);
            field.handleBlur();
          },
        }}
        inputProps={{
          intent,
          name: field.name,
        }}
      >
        <Button intent={intent} onClick={() => setIsOpen((old) => !old)}>
          {field.state.value ? field.state.value.label : 'Select...'}
        </Button>
      </BPSelect>
    </Label>
  );
}
