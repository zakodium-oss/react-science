import type { RefObject } from 'react';
import { createContext, use } from 'react';

import type { DraggableItemState } from './item_data.js';

export interface DraggableRowContextValue {
  state: DraggableItemState;
  dragHandleRef: RefObject<HTMLButtonElement | null>;
}

export const DraggableRowContext =
  createContext<DraggableRowContextValue | null>(null);

export function useTableDraggableRowContext() {
  const context = use(DraggableRowContext);
  if (!context) {
    throw new Error(
      'useDraggableItemContext must be used within an ItemContextProvider',
    );
  }
  return context;
}
