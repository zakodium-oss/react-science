import { BlueprintProvider, FocusStyleManager } from '@blueprintjs/core';
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
  fontSize: '14px',
  display: 'flex',
  flexDirection: 'column',
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
    <CustomDivPreflight
      ref={ref}
      style={{
        ...style,
        ...props.style,
      }}
      translate="no"
    >
      <BlueprintProvider
        {...(rootRef ? { portalContainer: rootRef } : undefined)}
      >
        <RootLayoutProvider innerRef={rootRef}>
          <QueryClientProvider client={queryClient}>
            <AccordionProvider>{props.children}</AccordionProvider>
          </QueryClientProvider>
        </RootLayoutProvider>
      </BlueprintProvider>
    </CustomDivPreflight>
  );
}
