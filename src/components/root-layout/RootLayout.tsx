import { FocusStyleManager } from '@blueprintjs/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { CSSProperties, ReactNode, useCallback, useState } from 'react';

import { AccordionProvider } from '../accordion';

import { RootLayoutProvider } from './RootLayoutContext';
import { CustomDivPreflight } from './css-reset/customPreflight';
import { queryClient } from './queryClient';

FocusStyleManager.onlyShowFocusOnTabs();

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
    <div style={{ ...style, ...props.style }}>
      <CustomDivPreflight ref={ref}>
        <RootLayoutProvider innerRef={rootRef}>
          <QueryClientProvider client={queryClient}>
            <AccordionProvider>{props.children}</AccordionProvider>
          </QueryClientProvider>
        </RootLayoutProvider>
      </CustomDivPreflight>
    </div>
  );
}
