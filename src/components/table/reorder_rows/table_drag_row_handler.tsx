import type { ButtonProps } from '@blueprintjs/core';
import { Button } from '@blueprintjs/core';

import { useIsPreviewTable } from '../preview_table_context.js';

import { useTableDraggableRowContext } from './draggable_row_context.js';
import { TableDropIndicator } from './drop_indicator.js';

export type TableDragRowHandlerProps = ButtonProps;

export function TableDragRowHandler(props: TableDragRowHandlerProps) {
  const isInPreview = useIsPreviewTable();
  if (isInPreview) {
    // Do not render the drag handler in the preview table.
    return null;
  }
  return <InternalTableDragRowHandler {...props} />;
}

function InternalTableDragRowHandler(props: TableDragRowHandlerProps) {
  const {
    icon = 'drag-handle-vertical',
    variant = 'minimal',
    style,
    ...otherProps
  } = props;
  const { dragHandleRef, state } = useTableDraggableRowContext();
  return (
    <>
      <Button
        type="button"
        icon={icon}
        ref={dragHandleRef}
        variant={variant}
        {...otherProps}
        style={{ cursor: 'grab', ...style }}
      />
      {state?.type === 'is-over' && state.closestEdge && (
        <TableDropIndicator edge={state.closestEdge} />
      )}
    </>
  );
}
