import { createContext, useContext } from 'react';

export const TableContext = createContext({ hasBorder: true, color: '' });
export function useTableContext() {
  const context = useContext(TableContext);
  return context;
}
