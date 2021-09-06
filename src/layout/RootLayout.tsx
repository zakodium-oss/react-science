/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode, CSSProperties } from 'react';

interface RootLayoutProps {
  children: ReactNode;
  style?: CSSProperties;
}

const style: CSSProperties = {
  width: '100%',
  height: '100%',
};

export function RootLayout(props: RootLayoutProps) {
  return (
    <div css={css([{ ...style }, { ...props.style }])}>{props.children}</div>
  );
}
