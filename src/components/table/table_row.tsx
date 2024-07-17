import type { HTMLAttributes, ReactNode } from 'react';

export type TrProps = Omit<HTMLAttributes<HTMLTableRowElement>, 'children'>;

export interface TableRowProps {
  children: ReactNode;
  trProps?: TrProps;
}

export function TableRow(props: TableRowProps) {
  const { children, trProps } = props;

  return <tr {...trProps}>{children}</tr>;
}
