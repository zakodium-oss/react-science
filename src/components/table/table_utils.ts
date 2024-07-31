import {
  type ColumnDef,
  createColumnHelper,
  type Row,
  type RowData,
} from '@tanstack/react-table';
import type { ReactNode } from 'react';

export type TableColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<
  TData,
  TValue
>;

export function createTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<TData>();
}

export interface TableRowTrRendererProps<TData extends RowData> {
  row: Row<TData>;
  children: ReactNode;
}
export type TableRowTrRenderer<TData extends RowData> = (
  props: TableRowTrRendererProps<TData>,
) => ReactNode;
