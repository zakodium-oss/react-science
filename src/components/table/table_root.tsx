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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Array<TableColumnDef<TData, any>>;

  bordered?: boolean;
  compact?: boolean;
  interactive?: boolean;
  striped?: boolean;
  stickyHeader?: boolean;
  /**
   * Use virtualized rows to optimize rendering.
   * When virtualizing rows, and in order to prevent layout shifts,
   * it is recommended to set a fixed width on columns.
   */
  virtualizeRows?: boolean;

  /**
   *
   * @param index
   */
  estimatedRowHeight?: (index: number) => number;

  reactTable?: Omit<
    TableOptions<TData>,
    'data' | 'columns' | 'getCoreRowModel' | 'getSortedRowModel'
  >;
  tableProps?: Omit<TableHTMLAttributes<HTMLTableElement>, 'children'>;
  renderRowTr?: TableRowTrRenderer<TData>;
}

interface RegularTableProps<TData extends RowData>
  extends TableBaseProps<TData> {
  virtualizeRows?: false;
}

interface VirtualizedTableProps<TData extends RowData>
  extends TableBaseProps<TData> {
  virtualizeRows: true;
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
    estimatedRowHeight,
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
    estimateSize: estimatedRowHeight ?? (() => 0),
    overscan: 5,
  });

  return (
    <Container
      virtualizeRows={virtualizeRows}
      totalHeight={tanstackVirtualizer.getTotalSize()}
      scrollRef={scrollElementRef}
    >
      <CustomHTMLTable
        bordered={bordered}
        compact={compact}
        interactive={interactive}
        striped={striped}
        {...tableProps}
        style={stickyHeader ? { display: 'contents' } : tableProps?.style}
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

function Container({
  virtualizeRows,
  totalHeight,
  scrollRef,
  children,
}: {
  virtualizeRows?: boolean;
  children: ReactNode;
  totalHeight: number;
  scrollRef: RefObject<HTMLDivElement>;
}) {
  if (virtualizeRows) {
    return (
      <div ref={scrollRef} style={{ height: '100%', overflow: 'auto' }}>
        <div style={{ height: totalHeight }}>{children}</div>
      </div>
    );
  }
  return <>{children}</>;
}
