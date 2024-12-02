import type { ColumnDef, Row, RowData } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/react-table';
import type { CSSProperties, ReactNode } from 'react';

export type TableColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<
  TData,
  TValue
>;

export function createTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<TData>();
}

export interface TableRowTrProps {
  style: CSSProperties;
  className: string;
  children: ReactNode;
}

export type TableRowTrRenderer<TData extends RowData> = (
  trProps: TableRowTrProps,
  row: Row<TData>,
) => ReactNode;
