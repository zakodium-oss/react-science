import type { ColumnDef, Row, RowData } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/react-table';
import type { ScrollToOptions } from '@tanstack/react-virtual';
import type { ReactNode } from 'react';

export type TableColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<
  TData,
  TValue
>;

export function createTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<TData>();
}

export interface TableRowTrProps {
  className: string;
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'data-row-id': string;
}

export type TableRowTrRenderer<TData extends RowData> = (
  trProps: TableRowTrProps,
  row: Row<TData>,
) => ReactNode;

export interface VirtualScroller {
  scrollIntoView: (id: string, options?: ScrollToOptions) => void;
}

export interface Scroller {
  scrollIntoView: (id: string, options?: ScrollIntoViewOptions) => void;
}
