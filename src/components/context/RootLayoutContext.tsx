import { createContext, ReactNode, useContext } from 'react';

const rootLayoutContext = createContext<HTMLElement | null>(null);

export function useRootLayoutContext() {
  const context = useContext(rootLayoutContext);
  if (!context) {
    throw new Error('RootLayoutContext was not found');
  }

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
