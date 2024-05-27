/** @jsxImportSource @emotion/react */
import { HTMLTable } from '@blueprintjs/core';
import {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react';

import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { TableContext } from './tableContext';

function splitChildren(children: ReactNode) {
  const Rows: ReactElement[] = [];
  let Header: ReactElement | null = null;
  for (const child of Children.toArray(children)) {
    if (typeof child !== 'object' || !isValidElement(child)) {
      throw new Error('invalid Table child');
    } else if (child.type === TableRow) {
      Rows.push(child);
    } else if (child.type === TableHeader) {
      Header = child;
    } else {
      throw new Error('invalid Table child');
    }
  }
  return { Rows, Header };
}
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children?: ReactNode;
  bordered?: boolean;
  compact?: boolean;
  interactive?: boolean;
  striped?: boolean;
  stickyHeader?: boolean;
  color?: string;
}

export function Table(props: TableProps) {
  const {
    bordered = false,
    compact = false,
    interactive = false,
    striped = false,
    color = '',
    children,
    ...tableProps
  } = props;
  const { Header, Rows } = splitChildren(children);

  const tableContextValue = useMemo(() => ({ color }), [color]);
  return (
    <TableContext.Provider value={tableContextValue}>
      <HTMLTable
        bordered={bordered}
        compact={compact}
        interactive={interactive}
        striped={striped}
        {...tableProps}
      >
        {Header}
        <tbody>{Rows}</tbody>
      </HTMLTable>
    </TableContext.Provider>
  );
}

Table.Row = TableRow;
Table.Header = TableHeader;
