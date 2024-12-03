/** @jsxImportSource @emotion/react */

import { HTMLTable } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { RowData, TableOptions } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { ReactNode, RefObject, TableHTMLAttributes } from 'react';
import { useRef } from 'react';

import { TableBody } from './table_body.js';
import { TableHeader } from './table_header.js';
import type { TableColumnDef, TableRowTrRenderer } from './table_utils.js';
import { useTableColumns } from './use_table_columns.js';

// Blueprint's HTMLTable `striped` prop's implementation is based on nth-child odd / even
// We cannot use that with virtualization, so we override its implementation here.
const CustomHTMLTable = styled(HTMLTable, {
  shouldForwardProp: (prop) => prop !== 'striped',
})`
  tbody tr.odd td {
    background: ${(props) =>
      props.striped ? 'rgba(143, 153, 168, 0.15)' : 'inherit'};
  }
`;

interface TableBaseProps<TData extends RowData> {
  data: TData[];
  /**
   * Tanstack table definition of columns in the table.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Array<TableColumnDef<TData, any>>;
  /**
   * Show borders between each cell and row of the table.
   */
  bordered?: boolean;
  /**
   * Reduce the padding around table cells.
   */
  compact?: boolean;
  /**
   * Change the background color of the row when hovering over it.
   */
  interactive?: boolean;
  /**
   * Alternate between gray and white background for each row.
   */
  striped?: boolean;
  /**
   * Set to true to enable a headers which sticks to the top of the table.
   */
  stickyHeader?: boolean;
  /**
   * Use virtualized rows to optimize rendering.
   * When virtualizing rows, and in order to prevent layout shifts,
   * it is recommended that all columns have a fixed width.
   */
  virtualizeRows?: boolean;

  reactTable?: Omit<
    TableOptions<TData>,
    'data' | 'columns' | 'getCoreRowModel' | 'getSortedRowModel'
  >;
  tableProps?: Omit<TableHTMLAttributes<HTMLTableElement>, 'children'>;
  /**
   * Override the default row rendering.
   * Make sure to spread the passed `trProps` onto the rendered `<tr>` element.
   */
  renderRowTr?: TableRowTrRenderer<TData>;
}

interface RegularTableProps<TData extends RowData>
  extends TableBaseProps<TData> {
  virtualizeRows?: false | undefined;
}

interface VirtualizedTableProps<TData extends RowData>
  extends TableBaseProps<TData> {
  virtualizeRows: true;
  /**
   * For virtualization of the table rows, provide an estimate of the height of each row.
   * @param index The index of the row in the data array.
   * @return The estimated height of the row at the given index.
   */
  estimatedRowHeight: (index: number) => number;
}

export type TableProps<TData extends RowData> =
  | RegularTableProps<TData>
  | VirtualizedTableProps<TData>;

export function Table<TData extends RowData>(props: TableProps<TData>) {
  const {
    data,
    columns,

    bordered = false,
    compact = false,
    interactive = false,
    striped = false,
    stickyHeader = false,

    reactTable,
    tableProps,
    renderRowTr,

    virtualizeRows,
  } = props;

  const scrollElementRef = useRef<HTMLDivElement>(null);
  const columnDefs = useTableColumns(columns);
  const table = useReactTable<TData>({
    ...reactTable,
    data,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const tanstackVirtualizer = useVirtualizer({
    enabled: virtualizeRows,
    count: data.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize:
      (props.virtualizeRows && props.estimatedRowHeight) || (() => 0),
    overscan: 5,
  });

  return (
    <Container virtualizeRows={virtualizeRows} scrollRef={scrollElementRef}>
      <CustomHTMLTable
        bordered={bordered}
        compact={compact}
        interactive={interactive}
        striped={striped}
        {...tableProps}
      >
        <TableHeader sticky={stickyHeader} headers={table.getFlatHeaders()} />
        <TableBody
          rows={table.getRowModel().rows}
          renderRowTr={renderRowTr}
          virtualizer={tanstackVirtualizer}
          virtualizeRows={virtualizeRows}
        />
      </CustomHTMLTable>
    </Container>
  );
}

const ScrollRefDiv = styled.div`
  height: 100%;
  overflow: auto;
`;

function Container({
  virtualizeRows,
  scrollRef,
  children,
}: {
  virtualizeRows?: boolean;
  children: ReactNode;
  scrollRef: RefObject<HTMLDivElement>;
}) {
  if (virtualizeRows) {
    return <ScrollRefDiv ref={scrollRef}>{children}</ScrollRefDiv>;
  }
  return <>{children}</>;
}
