import type { Intent } from '@blueprintjs/core';
import { FormGroup } from '@blueprintjs/core';
import type { ReactNode } from 'react';

interface LabelProps {
  children: ReactNode;
  error?: string;
  required?: boolean;
  label?: string;
  intent?: Intent;
  labelFor?: string;
}

export function Label(props: LabelProps) {
  const { children, required, label, error, intent, labelFor } = props;

  return (
    <FormGroup
      helperText={error}
      label={label}
      labelInfo={required && <span style={{ color: 'red' }}>*</span>}
      intent={intent}
      labelFor={labelFor}
    >
      {children}
    </FormGroup>
  );
}
