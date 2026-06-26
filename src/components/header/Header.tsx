import styled from '@emotion/styled';
import type { ReactElement } from 'react';

import type { ToolbarProps } from '../toolbar/Toolbar.js';

type ReactProps = ReactElement<ToolbarProps>;

interface HeaderProps {
  children: [ReactProps, ReactProps];
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid rgb(247 247 247);
  box-shadow: rgb(255 255 255) 0 1px 0 0 inset;
`;

export function Header(props: HeaderProps) {
  const { children } = props;
  return (
    <HeaderContainer>
      <div>{children[0]}</div>
      <div>{children[1]}</div>
    </HeaderContainer>
  );
}
