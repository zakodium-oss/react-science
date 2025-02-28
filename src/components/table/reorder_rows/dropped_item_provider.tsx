import { useState } from 'react';
import type { ReactNode } from 'react';

import { droppedItemContext } from './dropped_item_context.js';

export function DroppedItemProvider(props: { children: ReactNode }) {
  const value = useState<string>();
  return (
    <droppedItemContext.Provider value={value}>
      {props.children}
    </droppedItemContext.Provider>
  );
}
