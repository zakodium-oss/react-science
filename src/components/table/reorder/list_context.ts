import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';
import type { Row } from '@tanstack/react-table';
import { createContext, useContext } from 'react';

type CleanupCallback = () => void;

export interface ItemEntry {
  itemId: string;
  element: HTMLElement;
}

export type ReorderItemCallback = (args: {
  startIndex: number;
  indexOfTarget: number;
  closestEdgeOfTarget: Edge | null;
}) => void;

export interface ListContextValue<T = unknown> {
  items: Array<Row<T>>;
  registerItem: (entry: ItemEntry) => CleanupCallback;
  reorderItem: ReorderItemCallback;
}

export const ListContext = createContext<ListContextValue | null>(null);

export function useListContext() {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('useListContext must be used within a ListContextProvider');
  }
  return context;
}
