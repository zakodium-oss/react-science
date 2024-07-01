import { createContext, useContext } from 'react';

const defaultPortalContext =
  typeof document === 'undefined' ? null : document.body;

export const rootLayoutContext = createContext<HTMLElement | null>(
  defaultPortalContext,
);

export function useRootLayoutContext() {
  return useContext(rootLayoutContext);
}
