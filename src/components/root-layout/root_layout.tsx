import { BlueprintProvider, FocusStyleManager } from '@blueprintjs/core';
import { QueryClientProvider } from '@tanstack/react-query';
import type { CSSProperties, ReactNode } from 'react';
import { useCallback, useState } from 'react';

import { AccordionProvider } from '../accordion/index.js';

import { CustomDivPreflight } from './css-reset/customPreflight.js';
import { queryClient } from './query_client.js';
import { RootLayoutProvider } from './root_layout_context.provider.js';

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
