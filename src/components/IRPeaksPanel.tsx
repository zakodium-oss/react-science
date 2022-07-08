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
  jpath: keyof IRPeak;
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
    ({ jpath, label = jpath, format = (x: number) => x }) => ({
      header: label,
      accessorKey: jpath,
      cell: ({ getValue }) => format(getValue()),
    }),
  );

  function getColumnVisibility() {
    const columnVisibility: Record<string, boolean> = {};
    columns.forEach(({ jpath, visible = true }) => {
      columnVisibility[jpath] = visible;
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
              <ValueRenderers.Title
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
          {row.getVisibleCells().map((cell) => (
            <ValueRenderers.Text key={cell.id} value={cell.getValue()} />
          ))}
        </Table.Row>
      ))}
    </Table>
  );
}
