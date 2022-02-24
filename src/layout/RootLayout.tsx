/** @jsxImportSource @emotion/react */
import { ReactNode, CSSProperties, useState, useCallback } from 'react';

import { AccordionProvider } from './context/AccordionContext';
import { RootLayoutProvider } from './context/RootLayoutContext';
import { customDivPreflight } from './css/customPreflight';

interface RootLayoutProps {
  children: ReactNode;
  style?: CSSProperties;
}

const style: CSSProperties = {
  width: '100%',
  height: '100%',
};

export function RootLayout(props: RootLayoutProps) {
  const [state, setState] = useState<HTMLElement>(document.body);

  const ref = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setState(node);
    }
  }, []);

  return (
    <div style={{ ...style, ...props.style }}>
      <div
        ref={ref}
        css={customDivPreflight}
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        <RootLayoutProvider innerRef={state}>
          <AccordionProvider>{props.children}</AccordionProvider>
        </RootLayoutProvider>
      </div>
    </div>
  );
}
