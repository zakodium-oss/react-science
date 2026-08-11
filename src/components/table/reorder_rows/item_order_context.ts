import type { Edge } from '@zakodium/pdnd-esm';
import { createContext, useContext } from 'react';

export type ReorderItemCallback = (args: {
  startIndex: number;
  indexOfTarget: number;
  closestEdgeOfTarget: Edge | null;
}) => void;

export interface ItemOrderContextValue {
  items: Array<{ id: string }>;
  reorderItem: ReorderItemCallback;
  instanceId: symbol;
}

export const itemOrderContext = createContext<ItemOrderContextValue | null>(
  null,
);

export function useItemOrder() {
  const context = useContext(itemOrderContext);
  if (!context) {
    throw new Error('useItemOrder must be used within a ListContextProvider');
  }
  return context;
}
