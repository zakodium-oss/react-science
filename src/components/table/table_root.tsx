/** @jsxImportSource @emotion/react */

import { HTMLTable } from '@blueprintjs/core';
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

export interface TableProps<TData extends RowData> {
  data: TData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Array<TableColumnDef<TData, any>>;

  bordered?: boolean;
  compact?: boolean;
  interactive?: boolean;
  striped?: boolean;
  stickyHeader?: boolean;

  reactTable?: Omit<
    TableOptions<TData>,
    'data' | 'columns' | 'getCoreRowModel' | 'getSortedRowModel'
  >;
  tableProps?: Omit<TableHTMLAttributes<HTMLTableElement>, 'children'>;
  renderRowTr?: TableRowTrRenderer<TData>;
  virtualizer?: TableVirtualizer;
}

export interface TableVirtualizer {
  estimateSize: (index: number) => number;
}

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
    virtualizer,
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
    count: data.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: virtualizer ? virtualizer.estimateSize : () => 0,
    overscan: 5,
  });

  return (
    <Container
      virtualizer={virtualizer}
      totalHeight={tanstackVirtualizer.getTotalSize()}
      scrollRef={scrollElementRef}
    >
      <HTMLTable
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
          virtualizationEnabled={!!virtualizer}
        />
      </HTMLTable>
    </Container>
  );
}

function Container({
  virtualizer,
  totalHeight,
  scrollRef,
  children,
}: {
  virtualizer?: TableVirtualizer;
  children: ReactNode;
  totalHeight: number;
  scrollRef: RefObject<any>;
}) {
  if (!virtualizer) {
    return <>{children}</>;
  }

  return (
    <div ref={scrollRef} style={{ height: '100%', overflow: 'auto' }}>
      <div style={{ height: totalHeight }}>{children}</div>
    </div>
  );
}
