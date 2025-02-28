import type { RefObject } from 'react';
import { createContext, useContext } from 'react';

import type { DraggableItemState } from './item_data.js';

export interface DraggableRowContext {
  state: DraggableItemState;
  dragHandleRef: RefObject<HTMLButtonElement>;
}

export const draggableRowContext = createContext<DraggableRowContext | null>(
  null,
);

export function useTableDraggableRowContext() {
  const context = useContext(draggableRowContext);
  if (!context) {
    throw new Error(
      'useDraggableItemContext must be used within an ItemContextProvider',
    );
  }
  return context;
}
