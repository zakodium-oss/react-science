import { createContext, ReactNode, useContext } from 'react';

const defaultPortalContext =
  typeof document === 'undefined' ? null : document.body;

const rootLayoutContext = createContext<HTMLElement | null>(
  defaultPortalContext,
);

export function useRootLayoutContext() {
  const context = useContext(rootLayoutContext);
  return context;
}

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
