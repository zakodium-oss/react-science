import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';

import type { IRPeak } from '../../app-data/index';
import { Table, ValueRenderers } from '../../components/index';

export interface IRColumnPreferences<T extends keyof IRPeak = keyof IRPeak> {
  visible?: boolean;
  format?: (val: IRPeak[T]) => string | number;
  accessorKey: T;
  label?: string;
}
interface IRPeakPanelPreferences {
  columns?: IRColumnPreferences[];
}
export interface IRPeaksPanelProps {
  /**
   * peaks to display in the panel
   *
   */
  peaks: IRPeak[];
  /**
   * The columns to display in the table.
   * @default {}
   */
  preferences?: IRPeakPanelPreferences;
}

export function IRPeaksPanel(props: IRPeaksPanelProps) {
  const { peaks, preferences = {} } = props;
  const { columns = [] } = preferences;

  const defaultColumns: ColumnDef<IRPeak, number>[] = columns.map(
    ({ accessorKey, label = accessorKey, format = (x: number) => x }) => ({
      header: label,
      accessorKey,
      cell: ({ getValue }) => format(getValue()),
    }),
  );

  function getColumnVisibility() {
    const columnVisibility: Record<string, boolean> = {};
    for (const { accessorKey, visible = true } of columns) {
      columnVisibility[accessorKey] = visible;
    }
    return columnVisibility;
  }

  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: peaks,
    columns: defaultColumns,
    state: {
      sorting,
      columnVisibility: getColumnVisibility(),
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <Table>
      <Table.Header>
        {table
          .getHeaderGroups()
          .map(({ headers }) =>
            headers.map((header) => (
              <ValueRenderers.Header
                style={{ cursor: 'pointer' }}
                onClick={header.column.getToggleSortingHandler()}
                key={header.id}
                value={header.column.columnDef.header?.toString()}
                sorted={header.column.getIsSorted()}
              />
            )),
          )}
      </Table.Header>
      {table.getRowModel().rows.map((row) => (
        <Table.Row key={row.id}>
          {row.getVisibleCells().map((cell) => {
            const value = (cell.column.columnDef.cell as CallableFunction)(
              cell.getContext(),
            );
            return (
              <ValueRenderers.Text
                key={cell.id}
                value={value !== undefined ? value : cell.getValue()}
              />
            );
          })}
        </Table.Row>
      ))}
    </Table>
  );
}
