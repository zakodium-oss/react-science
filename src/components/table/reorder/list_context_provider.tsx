import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';
import { getReorderDestinationIndex } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index';
import type { Row } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';

import type { ReorderItemCallback } from './list_context.js';
import { ListContext } from './list_context.js';

interface ListContextProviderProps<T> {
  items: Array<Row<T>>;
  setItems: (items: Array<Row<T>>) => void;
  children: ReactNode;
}

interface ItemEntry {
  itemId: string;
  element: HTMLElement;
}

function getItemRegistry() {
  const registry = new Map<string, HTMLElement>();

  function register({ itemId, element }: ItemEntry) {
    registry.set(itemId, element);

    return function unregister() {
      // Due to how the virtualizer works,
      // a new item can be mounted before an old
      // item is removed.
      // We don't want `unregister` to remove
      // a new registration
      if (registry.get(itemId) === element) {
        registry.delete(itemId);
      }
    };
  }

  function getElement(itemId: string): HTMLElement | null {
    return registry.get(itemId) ?? null;
  }

  return { register, getElement };
}

export function ListContextProvider<T = unknown>(
  props: ListContextProviderProps<T>,
) {
  const { items, setItems, children } = props;
  const [registry] = useState(getItemRegistry);
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

      setItems(
        reorder({
          list: items,
          startIndex,
          finishIndex,
        }),
      );
    },
    [items, setItems],
  );

  const value = useMemo(
    () => ({ reorderItem, registerItem: registry.register, items }),
    [reorderItem, registry.register],
  );

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
}
