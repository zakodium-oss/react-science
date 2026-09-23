import type { Edge } from '@zakodium/pdnd-esm';
import { createContext, use } from 'react';

export type ReorderItemCallback = (options: {
  startIndex: number;
  indexOfTarget: number;
  closestEdgeOfTarget: Edge | null;
}) => void;

export interface ItemOrderContextValue {
  items: Array<{ id: string }>;
  reorderItem: ReorderItemCallback;
  instanceId: symbol;
}

export const ItemOrderContext = createContext<ItemOrderContextValue | null>(
  null,
);

export function useItemOrder() {
  const context = use(ItemOrderContext);
  if (!context) {
    throw new Error('useItemOrder must be used within a ListContextProvider');
  }
  return context;
}
