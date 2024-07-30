/** @jsxImportSource @emotion/react */

import { HTMLTable } from '@blueprintjs/core';
import {
  getCoreRowModel,
  getSortedRowModel,
  type RowData,
  type TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import { TableHTMLAttributes } from 'react';

import { TableBody } from './table_body';
import { TableHeader } from './table_header';
import type { TableColumnDef, TableRowTrPropsGetter } from './table_utils';
import { useTableColumns } from './use_table_columns';

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
  getRowTrProps?: TableRowTrPropsGetter<TData>;
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
    getRowTrProps,
  } = props;

  const columnDefs = useTableColumns(columns);
  const table = useReactTable<TData>({
    ...reactTable,
    data,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
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
        getRowTrProps={getRowTrProps}
      />
    </HTMLTable>
  );
}
