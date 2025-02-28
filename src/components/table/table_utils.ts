import type { Cell, ColumnDef, Row, RowData } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/react-table';
import type { ScrollToOptions } from '@tanstack/react-virtual';
import type { CSSProperties, ReactNode, TdHTMLAttributes } from 'react';

export type TableColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<
  TData,
  TValue
>;

type TableTdProps = TdHTMLAttributes<HTMLTableCellElement>;

export type GetTdProps<TData extends RowData> = (
  cell: Cell<TData, unknown>,
) => TableTdProps;

export function createTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<TData>();
}

export interface TableRowTrProps {
  className: string;
  style: CSSProperties;
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'data-row-id': string;
}

export type TableRowTrRenderer<TData extends RowData> = (
  trProps: TableRowTrProps,
  row: Row<TData>,
) => ReactNode;

export type TableRowPreviewRenderer<TData extends RowData> = (
  row: Row<TData>,
) => ReactNode;

export interface VirtualScroller {
  scrollIntoView: (id: string, options?: ScrollToOptions) => void;
}

export interface Scroller {
  scrollIntoView: (id: string, options?: ScrollIntoViewOptions) => void;
}
