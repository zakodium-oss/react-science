import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';

import { IRPeak } from './context/data/DataState';

interface Preferences {
  wavenumber: {
    display: boolean;
    format: (val: number) => string | number;
  };
  absorbance: {
    display: boolean;
    format: (val: number) => string | number;
  };
  transmittance: {
    display: boolean;
    format: (val: number) => string | number;
  };
  kind: {
    display: boolean;
    format: (val: string) => string | number;
  };
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
  preferences?: Preferences;
}

export function IRPeaksPanel(props: IRPeaksPanelProps) {
  const {
    peaks,
    preferences = {
      wavenumber: { format: (x) => x, display: true },
      transmittance: { format: (x) => x, display: true },
      absorbance: { format: (x) => x, display: true },
      kind: { format: (x) => x, display: true },
    },
  } = props;
  const columns: ColumnDef<IRPeak>[] = [
    {
      header: 'Wavenumber [cm-1]',
      accessorKey: 'wavenumber',
      cell: ({ getValue }) => preferences.wavenumber.format(getValue()),
    },
    {
      header: 'Transmittance',
      accessorKey: 'transmittance',
      cell: ({ getValue }) => preferences.transmittance.format(getValue()),
    },
    {
      header: 'Absorbance',
      accessorKey: 'absorbance',
      cell: ({ getValue }) => preferences.absorbance.format(getValue()),
    },
    {
      header: 'Kind',
      accessorKey: 'kind',
      cell: ({ getValue }) => preferences.kind.format(getValue()),
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: peaks,
    columns,
    state: {
      sorting,
      columnVisibility: Object.entries(preferences).reduce(
        (obj, [key, { display }]) => Object.assign(obj, { [key]: display }),
        {},
      ),
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{ border: 'solid 1px black', padding: '5px' }}
              >
                {header.isPlaceholder ? null : (
                  <div
                    style={{
                      cursor: header.column.getCanSort() ? 'pointer' : '',
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                style={{ border: 'solid 1px black', padding: '5px' }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
