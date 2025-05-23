import type { ElementDragPayload } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import type { Row, RowData } from '@tanstack/react-table';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  attachClosestEdge,
  combine,
  draggable,
  dropTargetForElements,
  extractClosestEdge,
  pointerOutsideOfPreview,
  setCustomNativeDragPreview,
} from '../../pdnd.cjs';
import { assert } from '../../utils/index.js';
import { useFlashRowEffect } from '../flash_row/use_flash_row_effect.js';
import { PreviewTable } from '../preview_table.js';
import { useIsPreviewTable } from '../preview_table_context.js';
import type {
  TableRowPreviewRenderer,
  TableRowTrRenderProps,
} from '../table_utils.js';

import type { DraggableRowContext } from './draggable_row_context.js';
import { draggableRowContext } from './draggable_row_context.js';
import type { DraggableItemState } from './item_data.js';
import { getItemData, isItemData } from './item_data.js';
import { useItemOrder } from './item_order_context.js';

export interface TableDraggableRowTrProps<TData extends RowData> {
  /**
   * Props to be spread on the `tr` element.
   */
  trProps: TableRowTrRenderProps;
  /**
   * Row data.
   */
  row: Row<TData>;
  /**
   * Preview of the row being dragged.
   */
  renderRowPreview?: TableRowPreviewRenderer<TData>;
}

export function TableDraggableRowTr<TData extends RowData>(
  props: TableDraggableRowTrProps<TData>,
) {
  const {
    trProps,
    row,
    renderRowPreview = (row) => <PreviewTable row={row} />,
  } = props;
  const { instanceId } = useItemOrder();
  const isPreview = useIsPreviewTable();
  const tableRowRef = useRef<HTMLTableRowElement>(null);
  const [state, setState] = useState<DraggableItemState>(idleState);

  const dragHandleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (isPreview) {
      // No drag and drop in preview
      return;
    }
    const trElement = tableRowRef.current;
    assert(trElement, 'tr ref is null');
    assert(dragHandleRef.current, 'dragHandleRef is null');

    function canDrop({ source }: { source: ElementDragPayload }): boolean {
      return (
        isItemData(source.data) &&
        source.data.instanceId === instanceId &&
        source.data.id !== row.id
      );
    }

    const data = getItemData(row as Row<unknown>, instanceId);

    return combine(
      draggable({
        element: trElement,
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
        element: trElement,
        canDrop,
        getIsSticky: () => false,
        getData({ input }) {
          return attachClosestEdge(data, {
            element: trElement,
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
  }, [row, instanceId, isPreview]);

  useFlashRowEffect(row.id, tableRowRef);

  const value = useMemo<DraggableRowContext>(() => {
    return {
      dragHandleRef,
      state,
    };
  }, [state]);

  return (
    <>
      <draggableRowContext.Provider value={value}>
        <tr {...trProps} ref={tableRowRef} />
      </draggableRowContext.Provider>
      {state.type === 'preview' &&
        createPortal(renderRowPreview(row), state.container)}
    </>
  );
}

const idleState: DraggableItemState = { type: 'idle' };
const draggingState: DraggableItemState = { type: 'dragging' };
