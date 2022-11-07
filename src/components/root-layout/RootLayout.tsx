/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import { ReactNode, CSSProperties, useState, useCallback } from 'react';
import root from 'react-shadow/emotion.esm';

import { AccordionProvider } from '../accordion/AccordionContext';

import { RootLayoutProvider } from './RootLayoutContext';
import { customDivPreflight } from './css-reset/customPreflight';
import { preflight } from './css-reset/preflight';

interface RootLayoutProps {
  style?: CSSProperties;
  children: ReactNode;
}

const style: CSSProperties = {
  width: '100%',
  height: '100%',
  fontSize: '12px',
};

export function RootLayout(props: RootLayoutProps) {
  const [rootRef, setRootRef] = useState<HTMLElement | null>(
    typeof document !== 'undefined' ? document.body : null,
  );

  const ref = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setRootRef(node);
    }
  }, []);

  return (
    <root.div style={{ ...style, ...props.style }}>
      <Global styles={preflight} />
      <div
        ref={ref}
        css={customDivPreflight}
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        <RootLayoutProvider innerRef={rootRef}>
          <AccordionProvider>{props.children}</AccordionProvider>
        </RootLayoutProvider>
      </div>
    </root.div>
  );
}
