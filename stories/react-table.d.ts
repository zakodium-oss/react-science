import type { CellData, RowData, TableFeatures } from '@tanstack/react-table';
import type { CSSProperties } from 'react';

declare module '@tanstack/react-table' {
  // Declaration merging
  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface ColumnMeta<
    TFeatures extends TableFeatures,
    TData extends RowData,
    TValue extends CellData = CellData,
  > {
    color?: CSSProperties['backgroundColor'];
    width?: number;
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */
}
