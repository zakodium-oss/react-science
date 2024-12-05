import type { RowData } from '@tanstack/react-table';
import type { CSSProperties } from 'react';

declare module '@tanstack/react-table' {
  // Declaration merging
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    color: CSSProperties['backgroundColor'];
    width?: number;
  }
}
