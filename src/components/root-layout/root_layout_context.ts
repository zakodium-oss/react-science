import { createContext, use } from 'react';

const defaultPortalContext =
  typeof document === 'undefined' ? null : document.body;

export const RootLayoutContext = createContext<HTMLElement | null>(
  defaultPortalContext,
);

export function useRootLayoutContext() {
  return use(RootLayoutContext);
}
