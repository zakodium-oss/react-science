import styled from '@emotion/styled';
import type { ReactNode } from 'react';

import { Button } from '../button/index.js';
import { SelectedTotal } from '../selected-total/index.js';

interface PanelHeaderProps {
  total?: number;
  current?: number;
  onClickSettings?: () => void;
  children?: ReactNode;
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.55px solid rgb(240 240 240);
`;

const HeaderLeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;

  '& > button:' {
    padding: 0 5px;
    min-width: auto;
  }
`;

export function PanelHeader(props: PanelHeaderProps) {
  const { total, current, children, onClickSettings } = props;

  return (
    <HeaderContainer>
      <HeaderLeftContainer>{children}</HeaderLeftContainer>
      <SelectedTotal count={current} total={total} />
      {onClickSettings && (
        <Button color="black" minimal onClick={onClickSettings} icon="cog" />
      )}
    </HeaderContainer>
  );
}
