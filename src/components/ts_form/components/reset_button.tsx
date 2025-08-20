import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { useCallback } from 'react';

import { Button } from '../../button/index.js';
import { useFormContext } from '../context/use_ts_form.js';

interface ResetButtonProps {
  children: ReactNode;
}

const StyledResetButton = styled(Button)`
  background-color: #dd3f3f !important;
  color: white !important;
`;

export function ResetButton(props: ResetButtonProps) {
  const { children } = props;
  const form = useFormContext();

  const handleOnClick = useCallback(() => {
    form.reset();
  }, [form]);

  return (
    <StyledResetButton type="reset" onClick={handleOnClick}>
      {children}
    </StyledResetButton>
  );
}
