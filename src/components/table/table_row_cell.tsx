import type { Cell, RowData } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

import type { GetTdProps } from './table_utils.js';

interface TableRowCellProps<TData extends RowData> {
  cell: Cell<TData, unknown>;
  getTdProps: GetTdProps<TData> | undefined;
}

export function TableRowCell<TData extends RowData>(
  props: TableRowCellProps<TData>,
) {
  const { cell, getTdProps } = props;

  return (
    <td {...getTdProps?.(cell)}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
}
