import { Button } from '@blueprintjs/core';

import { useTableDraggableRowContext } from './draggable_row_context.js';
import { TableDropIndicator } from './drop_indicator.js';

export function TableDragRowHandler() {
  const { dragHandleRef, state } = useTableDraggableRowContext();
  return (
    <>
      <Button
        icon="drag-handle-horizontal"
        type="button"
        ref={dragHandleRef}
        variant="minimal"
        style={{ cursor: 'grab' }}
      />
      {state?.type === 'is-over' && state.closestEdge && (
        <TableDropIndicator edge={state.closestEdge} />
      )}
      <TableDropIndicator edge="bottom" />
    </>
  );
}
