import type { ColumnDef, Row, RowData } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/react-table';
import type { VirtualItem } from '@tanstack/react-virtual';
import type { ReactNode } from 'react';

export type TableColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<
  TData,
  TValue
>;

export function createTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<TData>();
}

export type RenderRowVirtualItem = VirtualItem & {
  /**
   * The index of the element within the virtual list being currently rendered.
   */
  virtualIndex: number;
};

export interface TableRowTrRendererProps<TData extends RowData> {
  row: Row<TData>;
  children: ReactNode;
}
export type TableRowTrRenderer<TData extends RowData> = (
  props: TableRowTrRendererProps<TData>,
  virtualItem?: RenderRowVirtualItem,
) => ReactNode;
