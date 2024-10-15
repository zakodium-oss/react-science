import type { Row, RowData } from '@tanstack/react-table';
import { Fragment } from 'react';

import { TableRowCell } from './table_row_cell.js';
import type {
  TableRowTrRenderer,
  TableRowTrRendererProps,
} from './table_utils.js';

interface TableBodyProps<TData extends RowData> {
  rows: Array<Row<TData>>;
  renderRowTr: TableRowTrRenderer<TData> | undefined;
}

export function TableBody<TData extends RowData>(props: TableBodyProps<TData>) {
  const { rows, renderRowTr = defaultRenderRowTr } = props;
  return (
    <tbody>
      {rows.map((row) => (
        <Fragment key={row.id}>
          {renderRowTr({
            row,
            children: row
              .getVisibleCells()
              .map((cell) => <TableRowCell key={cell.id} cell={cell} />),
          })}
        </Fragment>
      ))}
    </tbody>
  );
}

function defaultRenderRowTr<TData extends RowData>(
  props: TableRowTrRendererProps<TData>,
) {
  return <tr>{props.children}</tr>;
}
