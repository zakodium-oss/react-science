import type { Row, RowData } from '@tanstack/react-table';
import { getReorderDestinationIndex, reorder } from '@zakodium/pdnd-esm';
import type { ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';

import type { ReactScienceTableFeatures } from '../table_features.js';

import type {
  ItemOrderContextValue,
  ReorderItemCallback,
} from './item_order_context.js';
import { itemOrderContext } from './item_order_context.js';

interface ItemOrderProviderProps<T extends RowData> {
  items: Array<Row<ReactScienceTableFeatures, T>>;
  onOrderChanged: (items: Array<Row<ReactScienceTableFeatures, T>>) => void;
  children: ReactNode;
}

export function ItemOrderProvider<T extends RowData = RowData>(
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

  const value = useMemo<ItemOrderContextValue>(() => {
    return {
      reorderItem,
      items,
      instanceId,
    };
  }, [reorderItem, items, instanceId]);

  return (
    <itemOrderContext.Provider value={value}>
      {children}
    </itemOrderContext.Provider>
  );
}
