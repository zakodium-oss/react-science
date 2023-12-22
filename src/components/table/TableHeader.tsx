import type { TableProps } from './Table';
import { TableRow } from './TableRow';

export const TableHeader = ({ children, hasBorder, style }: TableProps) => {
  return (
    <thead>
      <TableRow hasBorder={hasBorder} style={style}>
        {children}
      </TableRow>
    </thead>
  );
};
