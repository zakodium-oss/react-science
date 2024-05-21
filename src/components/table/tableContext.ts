import { createContext, useContext } from 'react';

export const TableContext = createContext({ color: '' });
export function useTableContext() {
  const context = useContext(TableContext);
  return context;
}
