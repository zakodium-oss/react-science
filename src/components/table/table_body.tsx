import type { Row, RowData } from '@tanstack/react-table';
import type { Virtualizer } from '@tanstack/react-virtual';
import { Fragment } from 'react';

import { TableRowCell } from './table_row_cell.js';
import type {
  RenderRowVirtualItem,
  TableRowTrRenderer,
  TableRowTrRendererProps,
} from './table_utils.js';

interface TableBodyProps<TData extends RowData> {
  rows: Array<Row<TData>>;
  renderRowTr: TableRowTrRenderer<TData> | undefined;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  virtualizationEnabled: boolean;
}

export function TableBody<TData extends RowData>(props: TableBodyProps<TData>) {
  const {
    rows,
    renderRowTr = defaultRenderRowTr,
    virtualizer,
    virtualizationEnabled,
  } = props;

  if (virtualizationEnabled) {
    const virtualItems = virtualizer.getVirtualItems();
    return (
      <tbody>
        {virtualItems.map((virtualItem, index) => (
          <TableRow
            key={virtualItem.index}
            row={rows[virtualItem.index]}
            renderRowTr={(row) =>
              renderRowTr(row, { ...virtualItem, virtualIndex: index })
            }
          />
        ))}
      </tbody>
    );
  }
  return (
    <tbody>
      {rows.map((row) => (
        <TableRow key={row.id} row={row} renderRowTr={renderRowTr} />
      ))}
    </tbody>
  );
}

function TableRow<TData>({
  row,
  renderRowTr,
}: {
  row: Row<TData>;
  renderRowTr: TableRowTrRenderer<TData>;
}) {
  return (
    <Fragment>
      {renderRowTr({
        row,
        children: row
          .getVisibleCells()
          .map((cell) => <TableRowCell key={cell.id} cell={cell} />),
      })}
    </Fragment>
  );
}

function defaultRenderRowTr<TData extends RowData>(
  props: TableRowTrRendererProps<TData>,
  virtualItem?: RenderRowVirtualItem,
) {
  const style = virtualItem
    ? {
        height: virtualItem.size,
        transform: `translateY(${
          virtualItem.start - virtualItem.virtualIndex * virtualItem.size
        }px)`,
      }
    : undefined;
  return <tr style={style}>{props.children}</tr>;
}
