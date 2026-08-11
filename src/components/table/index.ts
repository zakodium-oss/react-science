import type {
  CellData,
  RowData,
  TableFeatures as TanstackTableFeatures,
} from '@tanstack/react-table';
import type { CSSProperties } from 'react';

export * from './table_root.js';
export * from './table_utils.js';
export * from './table_row.js';
export * from './reorder_rows/index.js';

declare module '@tanstack/react-table' {
  // Declaration merging
  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface ColumnMeta<
    TFeatures extends TanstackTableFeatures,
    TData extends RowData,
    TValue extends CellData = CellData,
  > {
    /**
     * Merged into the `style` prop of the default-rendered `<th>` element.
     */
    thStyle?: CSSProperties;

    /**
     * Merged into the `style` prop of the default-rendered `<td>` element.
     */
    tdStyle?: CSSProperties;
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */
}
