import { Button } from '@blueprintjs/core';

import { useIsPreviewTable } from '../preview_table_context.js';

import { useTableDraggableRowContext } from './draggable_row_context.js';
import { TableDropIndicator } from './drop_indicator.js';

export function TableDragRowHandler() {
  const isInPreview = useIsPreviewTable();
  if (isInPreview) {
    // Do not render the drag handler in the preview table.
    return null;
  }
  return <InternalTableDragRowHandler />;
}

function InternalTableDragRowHandler() {
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
    </>
  );
}
