import type { useState } from 'react';
import { createContext, useContext } from 'react';

/**
 * ID of the dropped item
 */
type DroppedItemContextValue = ReturnType<typeof useState<string>>;

export const droppedItemContext = createContext<DroppedItemContextValue | null>(
  null,
);

export function useDroppedItemContext() {
  const context = useContext(droppedItemContext);

  if (!context) {
    throw new Error(
      'useDroppedItemId must be used within a DroppedItemProvider',
    );
  }

  return context;
}
