import type { ReactNode } from 'react';

import { RootLayoutContext } from './root_layout_context.js';

export function RootLayoutProvider(props: {
  children: ReactNode;
  innerRef: HTMLElement | null;
}) {
  return (
    <RootLayoutContext value={props.innerRef}>
      {props.children}
    </RootLayoutContext>
  );
}
