import { createContext, useContext } from 'react';

export type Layout = 'inline' | 'stacked';

export const formContext = createContext<{ layout: Layout }>({
  layout: 'stacked',
});

export function useFormContext() {
  return useContext(formContext);
}
