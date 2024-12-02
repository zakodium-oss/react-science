import type { Row, RowData } from '@tanstack/react-table';
import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

import { TableRowCell } from './table_row_cell.js';
import type { TableRowTrProps, TableRowTrRenderer } from './table_utils.js';

interface TableBodyProps<TData extends RowData> {
  rows: Array<Row<TData>>;
  renderRowTr: TableRowTrRenderer<TData> | undefined;
  virtualizeRows?: boolean;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
}

export function TableBody<TData extends RowData>(props: TableBodyProps<TData>) {
  const {
    rows,
    renderRowTr = defaultRenderRowTr as TableRowTrRenderer<TData>,
    virtualizer,
    virtualizeRows,
  } = props;

  if (virtualizeRows) {
    const virtualItems = virtualizer.getVirtualItems();
    return (
      <tbody>
        {virtualItems.map((virtualItem, index) => (
          <TableRow
            key={virtualItem.index}
            row={rows[virtualItem.index]}
            renderRowTr={(row) => {
              const trProps = getTrRenderProps<TData>(row, {
                ...virtualItem,
                virtualIndex: index,
              });
              return renderRowTr(trProps, row);
            }}
          />
        ))}
      </tbody>
    );
  }
  return (
    <tbody>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          row={row}
          renderRowTr={(row) => renderRowTr(getTrRenderProps(row), row)}
        />
      ))}
    </tbody>
  );
}

type TableRowRenderer<TData extends RowData> = (row: Row<TData>) => ReactNode;

function TableRow<TData>({
  row,
  renderRowTr,
}: {
  row: Row<TData>;
  renderRowTr: TableRowRenderer<TData>;
}) {
  return <Fragment>{renderRowTr(row)}</Fragment>;
}

const defaultRenderRowTr: TableRowTrRenderer<unknown> = (trProps) => (
  <tr {...trProps} />
);

type RenderRowVirtualItem = VirtualItem & {
  /**
   * The index of the element within the virtual list being currently rendered.
   */
  virtualIndex: number;
};

function getTrRenderProps<TData extends RowData>(
  row: Row<TData>,
  virtualItem?: RenderRowVirtualItem,
): TableRowTrProps {
  const index = virtualItem ? virtualItem.index : row.index;
  const style = virtualItem
    ? {
        height: virtualItem.size,
        transform: `translateY(${
          virtualItem.start - virtualItem.virtualIndex * virtualItem.size
        }px)`,
      }
    : {};

  return {
    style,
    // index is 0-indexed, so odd rows are even indices
    className: index % 2 === 0 ? 'odd' : '',
    children: row
      .getVisibleCells()
      .map((cell) => <TableRowCell key={cell.id} cell={cell} />),
  };
}
