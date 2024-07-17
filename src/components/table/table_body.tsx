import type { Row, RowData } from '@tanstack/react-table';
import type { HTMLAttributes } from 'react';

import { TableRow } from './table_row';
import { TableRowCell } from './table_row_cell';
import type { TableRowTrPropsGetter } from './table_utils';

export type TrPropsGetter = Omit<
  HTMLAttributes<HTMLTableRowElement>,
  'children'
>;

interface TableBodyProps<TData extends RowData> {
  rows: Array<Row<TData>>;
  getRowTrProps?: TableRowTrPropsGetter<TData>;
}

export function TableBody<TData extends RowData>(props: TableBodyProps<TData>) {
  const { rows, getRowTrProps } = props;
  return (
    <tbody>
      {rows.map((row) => (
        <TableRow key={row.id} trProps={getRowTrProps?.(row)}>
          {row.getVisibleCells().map((cell) => (
            <TableRowCell key={cell.id} cell={cell} />
          ))}
        </TableRow>
      ))}
    </tbody>
  );
}
