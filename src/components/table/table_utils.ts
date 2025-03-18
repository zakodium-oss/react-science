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

export interface TableRowTrRenderProps {
  className: string;
  style: CSSProperties;
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'data-row-id': string;
}

export type TableRowTrRenderer<TData extends RowData> = (
  trProps: TableRowTrRenderProps,
  row: Row<TData>,
) => ReactNode;

export type TableRowPreviewRenderer<TData extends RowData> = (
  /**
   * The row being dragged, for which to render a preview.
   */
  row: Row<TData>,
) => ReactNode;

interface FlashRowOptions {
  /**
   * Whether to flash the row when scrolling into view.
   * The option is only supported when there is no scroll animation, i.e. `behavior` is not `smooth`.
   */
  flashRow?: boolean;
}

export type TableScrollIntoViewOptions = ScrollIntoViewOptions &
  FlashRowOptions;
export type TableVirtualScrollIntoViewOptions = ScrollToOptions &
  FlashRowOptions;

export interface VirtualScroller {
  scrollIntoView: (
    id: string,
    options?: TableVirtualScrollIntoViewOptions,
  ) => void;
}

export interface Scroller {
  scrollIntoView: (id: string, options?: TableScrollIntoViewOptions) => void;
}
