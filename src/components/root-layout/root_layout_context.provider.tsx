import { ReactNode } from 'react';

import { rootLayoutContext } from './root_layout_context';

export function RootLayoutProvider(props: {
  children: ReactNode;
  innerRef: HTMLElement | null;
}) {
  return (
    <rootLayoutContext.Provider value={props.innerRef}>
      {props.children}
    </rootLayoutContext.Provider>
  );
}
