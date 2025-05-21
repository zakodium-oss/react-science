import type { Cell, RowData } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import type { CSSProperties } from 'react';

import type { GetTdProps } from './table_utils.js';

interface TableRowCellProps<TData extends RowData> {
  cell: Cell<TData, unknown>;
  tdStyle: CSSProperties | undefined;
  getTdProps: GetTdProps<TData> | undefined;
}

export function TableRowCell<TData extends RowData>(
  props: TableRowCellProps<TData>,
) {
  const { cell, tdStyle, getTdProps } = props;

  const tdProps = getTdProps?.(cell);
  const style = { ...tdStyle, ...tdProps?.style };

  return (
    <td {...tdProps} style={style}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
}
