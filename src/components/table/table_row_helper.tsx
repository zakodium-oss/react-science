import { RowTrDraggable } from './reorder/default_render_row_tr_draggable.js';
import type { TableRowTrRenderer } from './table_utils.js';

const renderRowTrDraggable: TableRowTrRenderer<unknown> = (trProps, row) => {
  return <RowTrDraggable row={row} trProps={trProps} />;
};
