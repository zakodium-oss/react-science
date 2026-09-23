import type { RowData } from '@tanstack/react-table';
import { createContext, use } from 'react';

import type { TableProps } from './table_root.js';

export type PreviewTablePropsContextValue<TData extends RowData> = Pick<
  TableProps<TData>,
  // These are the props that are forwarded from the original table
  // to the table used as a default preview for dragged rows.
  'getTdProps' | 'columns' | 'className' | 'renderRowTr' | 'compact'
>;

export const PreviewTablePropsContext =
  createContext<PreviewTablePropsContextValue<RowData> | null>(null);

export function usePreviewTableProps<TData extends RowData>() {
  const value = use(PreviewTablePropsContext);
  if (value === null) {
    throw new Error(
      'useTablePreviewProps must be used within a TablePreviewContextProvider',
    );
  }
  return value as PreviewTablePropsContextValue<TData>;
}

export const PreviewTablePropsContextProvider =
  PreviewTablePropsContext.Provider;

export const IsPreviewTableContext = createContext(false);

export function useIsPreviewTable() {
  return use(IsPreviewTableContext);
}
