import type { Row } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';

import { getReorderDestinationIndex, reorder } from '../../pdnd.cjs';

import type { ReorderItemCallback } from './item_order_context.js';
import { itemOrderContext } from './item_order_context.js';

interface ItemOrderProviderProps<T> {
  items: Array<Row<T>>;
  onOrderChanged: (items: Array<Row<T>>) => void;
  children: ReactNode;
}

export function ItemOrderProvider<T = unknown>(
  props: ItemOrderProviderProps<T>,
) {
  // Isolated instances of this component from one another
  const [instanceId] = useState(() => Symbol('table-instance-id'));
  const { items, onOrderChanged, children } = props;
  const reorderItem = useCallback<ReorderItemCallback>(
    ({ startIndex, indexOfTarget, closestEdgeOfTarget }) => {
      const finishIndex = getReorderDestinationIndex({
        startIndex,
        closestEdgeOfTarget,
        indexOfTarget,
        axis: 'vertical',
      });

      if (finishIndex === startIndex) {
        // If there is no change, we skip the update
        return;
      }

      onOrderChanged(
        reorder({
          list: items,
          startIndex,
          finishIndex,
        }),
      );
    },
    [items, onOrderChanged],
  );

  const value = useMemo(
    () => ({
      reorderItem,
      items: items as Array<Row<unknown>>,
      instanceId,
    }),
    [reorderItem, items, instanceId],
  );

  return (
    <itemOrderContext.Provider value={value}>
      {children}
    </itemOrderContext.Provider>
  );
}
