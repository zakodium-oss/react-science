import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import type { ElementDragPayload } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import {
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import type { Row } from '@tanstack/react-table';
import { useEffect, useMemo, useRef, useState } from 'react';

import { assert } from '../../utils/index.js';
import type { TableRowTrProps } from '../table_utils.js';

import type { ItemContextValue } from './item_context.js';
import { itemContext } from './item_context.js';
import { useListContext } from './list_context.js';
import type { ItemState } from './list_item.js';
import { getItemData, isItemData } from './list_item.js';

interface RowTrDraggableProps<TData> {
  trProps: TableRowTrProps;
  row: Row<TData>;
}

export function RowTrDraggable<TData>(props: RowTrDraggableProps<TData>) {
  const { trProps, row } = props;
  const { registerItem } = useListContext();
  const innerRef = useRef<HTMLTableRowElement>(null);
  const [state, setState] = useState<ItemState>(idleState);

  const dragHandleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const element = innerRef.current;
    assert(element, 'tr is null');
    assert(dragHandleRef.current, 'dragHandleRef is null');

    function predicate({ source }: { source: ElementDragPayload }): boolean {
      return isItemData(source.data) && source.data.item.id !== row.original.id;
    }

    const data = getItemData({ item: row.original, index: row.index });

    return combine(
      registerItem({ itemId: row.id, element }),
      draggable({
        element,
        dragHandle: dragHandleRef.current,
        getInitialData: () => data,
        onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: '8px',
              y: '8px',
            }),
            render({ container }) {
              setState({ type: 'preview', container });

              return () => setState(draggingState);
            },
          });
        },
        onDragStart() {
          setState(draggingState);
        },
        onDrop() {
          setState(idleState);
        },
      }),
      dropTargetForElements({
        element,
        canDrop: predicate,
        getIsSticky: () => true,
        getData({ input }) {
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ['top', 'bottom'],
          });
        },
        onDrag({ self }) {
          const closestEdge = extractClosestEdge(self.data);

          setState((current) => {
            if (
              current.type === 'is-over' &&
              current.closestEdge === closestEdge
            ) {
              return current;
            }
            return { type: 'is-over', closestEdge };
          });
        },
        onDragLeave() {
          setState(idleState);
        },
        onDrop() {
          setState(idleState);
        },
      }),
    );
  }, [row, registerItem]);

  const value = useMemo<ItemContextValue>(() => {
    return {
      dragHandleRef,
      state,
    };
  }, [state]);

  return (
    <itemContext.Provider value={value}>
      <tr {...trProps} ref={innerRef} />
    </itemContext.Provider>
  );
}

const idleState: ItemState = { type: 'idle' };
const draggingState: ItemState = { type: 'dragging' };
