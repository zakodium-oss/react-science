import type { Row } from '@tanstack/react-table';
import { useRef } from 'react';

import { useFlashRowEffect } from './flash_row/use_flash_row_effect.js';
import type { TableRowTrRenderProps } from './table_utils.js';

export interface TableRowTrProps {
  row: Row<unknown>;
  trProps: TableRowTrRenderProps;
}

export function TableRowTr(props: TableRowTrProps) {
  const { row, trProps } = props;
  const tableRowRef = useRef<HTMLTableRowElement>(null);
  useFlashRowEffect(row.id, tableRowRef);
  return <tr ref={tableRowRef} {...trProps} />;
}
