import { BlueprintProvider, FocusStyleManager } from '@blueprintjs/core';
import type { CSSProperties, MutableRefObject, ReactNode } from 'react';
import { useCallback, useState } from 'react';

import { AccordionProvider } from '../accordion/index.js';
import type { FullscreenProviderProps } from '../fullscreen/index.js';
import { FullScreenProvider } from '../fullscreen/index.js';

import { CustomDivPreflight } from './css-reset/customPreflight.js';
import { RootLayoutProvider } from './root_layout_context.provider.js';

FocusStyleManager.onlyShowFocusOnTabs();

interface RootLayoutProps {
  children: ReactNode;
  style?: CSSProperties;
  onFullscreenToggleError?: FullscreenProviderProps['onToggleError'];
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

  const refCallback = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setRootRef(node);
    }
  }, []);

  return (
    <FullScreenProvider onToggleError={props.onFullscreenToggleError}>
      {(fullscreenRef) => (
        <CustomDivPreflight
          id="root-layout"
          ref={(node) => {
            if (node) {
              const mutableRef =
                fullscreenRef as MutableRefObject<HTMLDivElement>;
              mutableRef.current = node;
              refCallback(node);
            }
          }}
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
              <AccordionProvider>{props.children}</AccordionProvider>
            </RootLayoutProvider>
          </BlueprintProvider>
        </CustomDivPreflight>
      )}
    </FullScreenProvider>
  );
}
