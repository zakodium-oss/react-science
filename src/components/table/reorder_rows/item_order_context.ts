import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';
import type { Row } from '@tanstack/react-table';
import { createContext, useContext } from 'react';

export type ReorderItemCallback = (args: {
  startIndex: number;
  indexOfTarget: number;
  closestEdgeOfTarget: Edge | null;
}) => void;

export interface ItemOrderContextValue<T = unknown> {
  items: Array<Row<T>>;
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
