/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import { ReactNode, CSSProperties } from 'react';
import root from 'react-shadow/emotion';

import { AccordionProvider } from './context/AccordionContext';
import { customDivPreflight, customPreflight } from './css/customPreflight';
import { preflight } from './css/preflight';

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
    <root.div style={{ ...style, ...props.style }}>
      <Global styles={[preflight, customPreflight]} />
      <div
        css={customDivPreflight}
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        <AccordionProvider>{props.children}</AccordionProvider>
      </div>
    </root.div>
  );
}
