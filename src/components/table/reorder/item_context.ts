import type { RefObject } from 'react';
import { createContext, useContext } from 'react';

import type { ItemState } from './list_item.js';

export interface ItemContextValue {
  state: ItemState;
  dragHandleRef: RefObject<HTMLButtonElement>;
}

export const itemContext = createContext<ItemContextValue | null>(null);

export function useItemContext() {
  const context = useContext(itemContext);
  if (!context) {
    throw new Error(
      'useItemContext must be used within an ItemContextProvider',
    );
  }
  return context;
}
