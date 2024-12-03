import type { Cell, RowData } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';

interface TableRowCellProps<TData extends RowData> {
  cell: Cell<TData, unknown>;
  className?: string;
}

export function TableRowCell<TData extends RowData>(
  props: TableRowCellProps<TData>,
) {
  const { cell, className } = props;

  return (
    <td style={{ position: 'relative' }} className={className}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
}
