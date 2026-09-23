import { createContext, use } from 'react';

export type Layout = 'inline' | 'stacked';

export const FormContext = createContext<{ layout: Layout }>({
  layout: 'stacked',
});

export function useFormContext() {
  return use(FormContext);
}
