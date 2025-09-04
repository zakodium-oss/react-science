import type { ReactNode } from 'react';

import { Button } from '../../../button/index.js';
import { useFormContext } from '../../context/use_ts_form.js';

interface ResetButtonProps {
  children: ReactNode;
}

export function ResetButton(props: ResetButtonProps) {
  const { children } = props;
  const form = useFormContext();

  return (
    <Button intent="danger" type="reset" onClick={() => form.reset()}>
      {children}
    </Button>
  );
}
