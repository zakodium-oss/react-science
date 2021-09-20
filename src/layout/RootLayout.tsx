/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode, CSSProperties } from 'react';

import { AccordionProvider } from './context/AccordionContext';

interface RootLayoutProps {
  children: ReactNode;
  style?: CSSProperties;
}

const style: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
};

export function RootLayout(props: RootLayoutProps) {
  return (
    <AccordionProvider>
      <div css={css([{ ...style }, { ...props.style }])}>{props.children}</div>
    </AccordionProvider>
  );
}
