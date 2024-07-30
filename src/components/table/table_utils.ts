import {
  type ColumnDef,
  createColumnHelper,
  type Row,
  type RowData,
} from '@tanstack/react-table';

import type { TrProps } from './table_row';

export type TableColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<
  TData,
  TValue
>;

export function createTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<TData>();
}

export type TableRowTrPropsGetter<TData extends RowData> = (
  row: Row<TData>,
) => TrProps;
