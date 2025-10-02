import type { ElementDragPayload } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { RefObject } from 'react';
import { useEffect } from 'react';

import {
  autoScrollForElements,
  combine,
  extractClosestEdge,
  monitorForElements,
} from '../../pdnd.cjs';
import { assert } from '../../utils/index.js';
import { useFlashedRowContext } from '../flash_row/flashed_row_context.js';

import { isItemData } from './item_data.js';
import { useItemOrder } from './item_order_context.js';

/**
 * Monitor drop events.
 * Check if they can be acted on to reorder items.
 * @param scrollElementRef The element to auto-scroll when dragging elements.
 * @param enabled Enable or disable the monitoring.
 */
export function useDropMonitor(
  scrollElementRef: RefObject<Element>,
  enabled: boolean,
) {
  const { reorderItem, items } = useItemOrder();
  const [, setFlashedRow] = useFlashedRowContext();
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const scrollContainer = scrollElementRef.current;
    assert(scrollContainer, 'Missing scroll container ref');

    function canRespond({ source }: { source: ElementDragPayload }) {
      return isItemData(source.data);
    }

    return combine(
      monitorForElements({
        canMonitor: canRespond,
        onDrop({ location, source }) {
          const target = location.current.dropTargets[0];
          if (!target) {
            return;
          }

          const sourceData = source.data;
          const targetData = target.data;
          if (!isItemData(sourceData) || !isItemData(targetData)) {
            return;
          }

          const indexOfTarget = items.findIndex(
            (item) => item.id === targetData.id,
          );
          if (indexOfTarget === -1) {
            return;
          }

          const closestEdgeOfTarget = extractClosestEdge(targetData);

          reorderItem({
            startIndex: sourceData.index,
            indexOfTarget,
            closestEdgeOfTarget,
          });
          setFlashedRow(sourceData.id);
        },
      }),
      autoScrollForElements({
        canScroll: canRespond,
        element: scrollContainer,
      }),
    );
  }, [items, reorderItem, scrollElementRef, setFlashedRow, enabled]);
}
