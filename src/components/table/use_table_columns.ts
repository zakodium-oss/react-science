import type { RowData } from '@tanstack/react-table';
import { useMemo } from 'react';

import { defaultTableCell } from './default_table_cell.js';
import type { TableColumnDefinition } from './table_utils.js';

export function useTableColumns<TData extends RowData, TValue>(
  columnDefs: Array<TableColumnDefinition<TData, TValue>>,
) {
  return useMemo<Array<TableColumnDefinition<TData, TValue>>>(() => {
    return columnDefs.map((columnDefinition) => {
      return {
        ...columnDefinition,
        cell: columnDefinition.cell ?? defaultTableCell,
        enableSorting: columnDefinition.enableSorting ?? false,
      };
    });
  }, [columnDefs]);
}
