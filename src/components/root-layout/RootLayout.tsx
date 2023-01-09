/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, CSSProperties, useState, useCallback } from 'react';
// @ts-expect-error We load emotion.esm because until this project is moved to true ESM.
import root from 'react-shadow/emotion.esm';

import { AccordionProvider } from '../accordion/AccordionContext';

import { RootLayoutProvider } from './RootLayoutContext';
import { CustomDivPreflight } from './css-reset/customPreflight';
import { preflight } from './css-reset/preflight';
import { queryClient } from './queryClient';

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
      <CustomDivPreflight ref={ref}>
        <RootLayoutProvider innerRef={rootRef}>
          <QueryClientProvider client={queryClient}>
            <AccordionProvider>{props.children}</AccordionProvider>
          </QueryClientProvider>
        </RootLayoutProvider>
      </CustomDivPreflight>
    </root.div>
  );
}
