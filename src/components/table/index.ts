import type { RowData } from '@tanstack/react-table';
import type { CSSProperties } from 'react';

export * from './table_root.js';
export * from './table_utils.js';
export * from './table_row.js';
export * from './reorder_rows/index.js';

declare module '@tanstack/react-table' {
  // Declaration merging
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /**
     * Merged into the `style` prop of the default-rendered `<th>` element.
     */
    thStyle?: CSSProperties;
  }
}
