/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import { ReactNode, CSSProperties, useState, useCallback } from 'react';
import root from 'react-shadow/emotion.esm';

import { AccordionProvider } from './context/AccordionContext';
import { RootLayoutProvider } from './context/RootLayoutContext';
import { customDivPreflight } from './css/customPreflight';
import { preflight } from './css/preflight';

interface RootLayoutProps {
  style?: CSSProperties;
  children: ReactNode;
}

const style: CSSProperties = {
  width: '100%',
  height: '100%',
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
    <root.div style={{ ...style, ...props.style }} id="root">
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
