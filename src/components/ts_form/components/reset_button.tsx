import styled from '@emotion/styled';
import type { ReactNode } from 'react';

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

  return (
    <StyledResetButton type="reset" onClick={() => form.reset()}>
      {children}
    </StyledResetButton>
  );
}
