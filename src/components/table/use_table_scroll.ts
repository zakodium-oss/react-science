import type { RowData, Table } from '@tanstack/react-table';
import type { Virtualizer } from '@tanstack/react-virtual';
import type { RefObject } from 'react';
import { useImperativeHandle } from 'react';

import { useFlashedRowContext } from './flash_row/flashed_row_context.js';
import type { TableProps } from './table_root.js';
import type { TableVirtualScrollIntoViewOptions } from './table_utils.js';

export function useTableScroll<TData extends RowData>(options: {
  scrollToRowRef: TableProps<TData>['scrollToRowRef'];
  virtualizeRows: TableProps<TData>['virtualizeRows'];
  scrollRef: RefObject<Element>;
  table: Table<TData>;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
}) {
  const [, setFlashedRow] = useFlashedRowContext();
  const { scrollToRowRef, virtualizeRows, scrollRef, table, virtualizer } =
    options;

  // @ts-expect-error We cannot call the hook conditionally to satisfy the type checker
  useImperativeHandle(scrollToRowRef, () => {
    if (virtualizeRows) {
      return {
        scrollIntoView(
          id: string,
          options?: TableVirtualScrollIntoViewOptions,
        ) {
          const sortedRows = table.getRowModel().rows; // Get sorted rows
          const rowIndex = sortedRows.findIndex((row) => row.id === id); // Find the index of the row by ID
          if (rowIndex === -1) {
            // We don't expect this situation, but it's not critical enough to throw an error.
            // eslint-disable-next-line no-console
            console.warn(
              `Could not scroll to row with ID ${id}, the row does not exist`,
            );
          } else {
            virtualizer.scrollToIndex(rowIndex, options);
            if (options?.flashRow && options.behavior !== 'smooth') {
              setFlashedRow(sortedRows[rowIndex].id);
            }
          }
        },
      };
    } else {
      return {
        scrollIntoView(
          id: string,
          options?: TableVirtualScrollIntoViewOptions,
        ) {
          const element = scrollRef.current?.querySelector(
            `tr[data-row-id="${id}"]`,
          );
          if (!element) {
            // eslint-disable-next-line no-console
            console.warn(
              `Could not scroll to row with ID ${id}, the row does not exist`,
            );
          }
          element?.scrollIntoView(options);
          if (options?.flashRow && options.behavior !== 'smooth') {
            setFlashedRow(id);
          }
        },
      };
    }
  }, [virtualizeRows, scrollRef, table, virtualizer, setFlashedRow]);
}
