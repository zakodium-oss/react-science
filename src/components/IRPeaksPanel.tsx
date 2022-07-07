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

type IRPeakPanelPreferences = Record<
  keyof IRPeak,
  {
    visible: boolean;
    format: (val: number | string) => string | number;
    label: string;
  }
>;
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
  const {
    peaks,
    preferences = {
      wavenumber: { format: (x) => x, visible: true, label: 'Wavenumber' },
      transmittance: {
        format: (x) => x,
        display: true,
        label: 'Transmittance',
      },
      absorbance: { format: (x) => x, display: true, label: 'Absorbance' },
      kind: { format: (x) => x, display: true, label: 'Kind' },
    },
  } = props;
  const columns: ColumnDef<IRPeak>[] = Object.entries(preferences).map(
    ([key, { label, format }]) => ({
      header: label,
      accessorKey: key,
      cell: ({ getValue }) => format(getValue()),
    }),
  );

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
