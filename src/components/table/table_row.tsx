import type { Row, RowData } from '@tanstack/react-table';
import type { JSX } from 'react';
import { useRef } from 'react';

import { useFlashRowEffect } from './flash_row/use_flash_row_effect.js';
import type { ReactScienceTableFeatures } from './table_features.js';

export interface TableRowTrProps<RowType extends RowData> {
  row: Row<ReactScienceTableFeatures, RowType>;
  trProps: JSX.IntrinsicElements['tr'];
}

export function TableRowTr<RowType extends RowData>(
  props: TableRowTrProps<RowType>,
) {
  const { row, trProps } = props;
  const tableRowRef = useRef<HTMLTableRowElement>(null);
  useFlashRowEffect(row.id, tableRowRef);
  return <tr ref={tableRowRef} {...trProps} />;
}
