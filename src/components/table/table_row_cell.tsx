import { type Cell, flexRender, type RowData } from '@tanstack/react-table';

interface TableRowCellProps<TData extends RowData> {
  cell: Cell<TData, unknown>;
}

export function TableRowCell<TData extends RowData>(
  props: TableRowCellProps<TData>,
) {
  const { cell } = props;

  return (
    <td style={{ position: 'relative' }}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
}
