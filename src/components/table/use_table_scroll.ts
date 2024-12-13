import type { RowData, Table } from '@tanstack/react-table';
import type {
  ScrollToOptions,
  ScrollToOptions as VirtualScrollToOptions,
  Virtualizer,
} from '@tanstack/react-virtual';
import { useImperativeHandle, useRef } from 'react';

import type { TableProps } from './table_root.js';

export function useTableScroll<TData extends RowData>(
  tableProps: TableProps<TData>,
  table: Table<TData>,
  virtualizer: Virtualizer<HTMLDivElement, Element>,
) {
  const tableRef = useRef<HTMLTableElement>(null);
  const { scrollToRowRef, virtualizeRows } = tableProps;

  // @ts-expect-error We cannot call the hook conditionally to satisfy the type checker
  useImperativeHandle(scrollToRowRef, () => {
    if (virtualizeRows) {
      return {
        scrollIntoView(id: string, options?: VirtualScrollToOptions) {
          const sortedRows = table.getRowModel().rows; // Get sorted rows
          const rowIndex = sortedRows.findIndex((row) => row.id === id); // Find the index of the row by ID
          if (rowIndex === -1) {
            // We don't expect this situation, but it's not critical enough to throw an error.
            // eslint-disable-next-line no-console
            console.warn(
              `Could not scroll to row with ID ${id}, the row does not exist`,
            );
          }
          virtualizer.scrollToIndex(rowIndex, options);
        },
      };
    } else {
      return {
        scrollIntoView(id: string, options?: ScrollToOptions) {
          const element = tableRef.current?.querySelector(
            `tr[data-row-id="${id}"]`,
          );
          if (!element) {
            // eslint-disable-next-line no-console
            console.warn(
              `Could not scroll to row with ID ${id}, the row does not exist`,
            );
          }
          element?.scrollIntoView(options);
        },
      };
    }
  }, [virtualizeRows, table, virtualizer]);

  return tableRef;
}
