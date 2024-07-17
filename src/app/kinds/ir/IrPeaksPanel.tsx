import { ColumnDef, SortingState } from '@tanstack/react-table';
import { useState } from 'react';

import type { IrPeak } from '../../../app-data/index';
import { Table } from '../../../components/index';

export interface IrColumnPreferences<T extends keyof IrPeak = keyof IrPeak> {
  visible?: boolean;
  format?: (val: IrPeak[T]) => string | number;
  accessorKey: T;
  label?: string;
}
interface IrPeakPanelPreferences {
  columns?: IrColumnPreferences[];
}
export interface IrPeaksPanelProps {
  /**
   * peaks to display in the panel
   *
   */
  peaks: IrPeak[];
  /**
   * The columns to display in the table.
   * @default {}
   */
  preferences?: IrPeakPanelPreferences;
}

export function IrPeaksPanel(props: IrPeaksPanelProps) {
  const { peaks, preferences = {} } = props;
  const { columns = [] } = preferences;

  const defaultColumns: Array<ColumnDef<IrPeak, number>> = columns.map(
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

  return (
    <Table
      bordered
      data={peaks}
      columns={defaultColumns}
      reactTable={{
        state: {
          sorting,
          columnVisibility: getColumnVisibility(),
        },
        onSortingChange: setSorting,
      }}
    />
  );
}
