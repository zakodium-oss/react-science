import type { ColumnDef, RowData } from '@tanstack/react-table';
import { useMemo } from 'react';

import { defaultTableCell } from './default_table_cell.js';
import type { TableColumnDef } from './table_utils.js';

export function useTableColumns<TData extends RowData>(
  columnDefs: Array<TableColumnDef<TData>>,
) {
  return useMemo<Array<ColumnDef<TData>>>(() => {
    return columnDefs.map((columnDef) => {
      return {
        ...columnDef,
        cell: columnDef.cell ?? defaultTableCell,
        enableSorting: columnDef.enableSorting ?? false,
      };
    });
  }, [columnDefs]);
}
