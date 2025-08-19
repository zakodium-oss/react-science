import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { useCallback } from 'react';

import { Button } from '../button/index.js';

import { useFormContext } from './context/use_ts_form.js';

interface ResetButtonProps {
  children: ReactNode;
}

const ResetButton = styled(Button)`
  background-color: #dd3f3f !important;
  color: white !important;
`;

export function TSResetButton(props: ResetButtonProps) {
  const { children } = props;
  const form = useFormContext();

  const handleOnClick = useCallback(() => {
    form.reset();
  }, [form]);

  return (
    <form.Subscribe>
      <ResetButton type="reset" onClick={handleOnClick}>
        {children}
      </ResetButton>
    </form.Subscribe>
  );
}
