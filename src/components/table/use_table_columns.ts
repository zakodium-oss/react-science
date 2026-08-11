import type { RowData } from '@tanstack/react-table';
import { useMemo } from 'react';

import { defaultTableCell } from './default_table_cell.js';
import type { TableColumnDef } from './table_utils.js';

export function useTableColumns<TData extends RowData, TValue>(
  columnDefs: Array<TableColumnDef<TData, TValue>>,
) {
  return useMemo<Array<TableColumnDef<TData, TValue>>>(() => {
    return columnDefs.map((columnDef) => {
      return {
        ...columnDef,
        cell: columnDef.cell ?? defaultTableCell,
        enableSorting: columnDef.enableSorting ?? false,
      };
    });
  }, [columnDefs]);
}
