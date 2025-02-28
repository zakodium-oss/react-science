import { Tag } from '@blueprintjs/core';
import type { Row, RowData } from '@tanstack/react-table';
import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import { notUndefined } from '@tanstack/react-virtual';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

import { TableDraggableRowTr } from './reorder_rows/index.js';
import { TableRowCell } from './table_row_cell.js';
import type {
  GetTdProps,
  TableRowPreviewRenderer,
  TableRowTrProps,
  TableRowTrRenderer,
} from './table_utils.js';

interface TableBodyProps<TData extends RowData> {
  rows: Array<Row<TData>>;
  getTdProps?: GetTdProps<TData>;
  renderRowTr: TableRowTrRenderer<TData> | undefined;
  virtualizeRows?: boolean;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  isReorderingEnabled: boolean;
  renderRowPreview?: TableRowPreviewRenderer<TData>;
}

export function TableBody<TData extends RowData>(props: TableBodyProps<TData>) {
  const {
    rows,
    getTdProps,
    renderRowTr = getDefaultRenderRowTr(
      props.isReorderingEnabled,
      props.renderRowPreview as TableRowPreviewRenderer<unknown>,
    ) as TableRowTrRenderer<TData>,
    virtualizer,
    virtualizeRows,
  } = props;

  if (virtualizeRows) {
    const virtualItems = virtualizer.getVirtualItems();
    const [before, after] =
      virtualItems.length > 0
        ? [
            virtualItems[0].start - virtualizer.options.scrollMargin,
            virtualizer.getTotalSize() - notUndefined(virtualItems.at(-1)).end,
          ]
        : [0, 0];
    return (
      <tbody>
        {before > 0 && (
          <tr>
            <td style={{ height: before }} />
          </tr>
        )}
        {virtualItems.map((virtualItem, index) => (
          <TableRow
            key={virtualItem.index}
            row={rows[virtualItem.index]}
            renderRowTr={(row) => {
              const trProps = getTrRenderProps<TData>(row, getTdProps, {
                ...virtualItem,
                virtualIndex: index,
              });
              return renderRowTr(trProps, row);
            }}
          />
        ))}
        {after > 0 && (
          <tr>
            <td style={{ height: after }} />
          </tr>
        )}
      </tbody>
    );
  }
  return (
    <tbody>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          row={row}
          renderRowTr={(row) =>
            renderRowTr(getTrRenderProps(row, getTdProps), row)
          }
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

type RenderRowVirtualItem = VirtualItem & {
  /**
   * The index of the element within the virtual list being currently rendered.
   */
  virtualIndex: number;
};

function getTrRenderProps<TData extends RowData>(
  row: Row<TData>,
  getTdProps: GetTdProps<TData> | undefined,
  virtualItem?: RenderRowVirtualItem,
): TableRowTrProps {
  const index = virtualItem ? virtualItem.index : row.index;

  return {
    // index is 0-indexed, so odd rows are even indices
    className: index % 2 === 0 ? 'odd' : '',
    style: { position: 'relative' },
    children: row
      .getVisibleCells()
      .map((cell) => (
        <TableRowCell<TData>
          key={cell.id}
          cell={cell}
          getTdProps={getTdProps}
        />
      )),
    'data-row-id': row.id,
  };
}

function getDefaultRenderRowTr(
  isReorderingEnabled: boolean,
  renderRowPreview: TableRowPreviewRenderer<unknown> | undefined,
): TableRowTrRenderer<unknown> {
  if (isReorderingEnabled) {
    return getDefaultRenderDraggableRowTr(renderRowPreview);
  } else {
    return defaultRenderRowTr;
  }
}

const defaultRenderRowTr: TableRowTrRenderer<unknown> = (trProps) => (
  <tr {...trProps} />
);

function getDefaultRenderDraggableRowTr(
  renderRowPreview: TableRowPreviewRenderer<unknown> | undefined,
): TableRowTrRenderer<unknown> {
  return (trProps, row) => (
    <TableDraggableRowTr
      trProps={trProps}
      row={row}
      renderRowPreview={
        renderRowPreview ?? ((row) => <Tag>Row {row.index + 1}</Tag>)
      }
    />
  );
}
