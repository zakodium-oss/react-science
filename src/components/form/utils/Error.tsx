import type { Intent } from '@blueprintjs/core';
import { FormGroup } from '@blueprintjs/core';
import type { ReactNode } from 'react';

interface LabelProps {
  children: ReactNode;
  error?: string;
  intent?: Intent;
}

export function Error(props: LabelProps) {
  const { children, error, intent } = props;

  return (
    <FormGroup helperText={error} intent={intent}>
      {children}
    </FormGroup>
  );
}
