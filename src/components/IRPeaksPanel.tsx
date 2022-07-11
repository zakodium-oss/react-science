import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';

import { Table, ValueRenderers } from '..';

import { IRPeak } from './context/data/DataState';

interface ColumnPreferences {
  visible?: boolean;
  format?: (val: number | string) => string | number;
  accessorKey: keyof IRPeak;
  label?: string;
}
interface IRPeakPanelPreferences {
  columns?: ColumnPreferences[];
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

  const defaultColumns: ColumnDef<IRPeak>[] = columns.map(
    ({ accessorKey, label = accessorKey, format = (x: number) => x }) => ({
      header: label,
      accessorKey,
      cell: ({ getValue }) => format(getValue()),
    }),
  );

  function getColumnVisibility() {
    const columnVisibility: Record<string, boolean> = {};
    columns.forEach(({ accessorKey, visible = true }) => {
      columnVisibility[accessorKey] = visible;
    });
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
