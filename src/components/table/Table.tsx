/* eslint-disable react/no-unused-prop-types */
/** @jsxImportSource @emotion/react */
import { HTMLTable } from '@blueprintjs/core';
import { css } from '@emotion/react';
import {
  Children,
  createContext,
  isValidElement,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from 'react';

import {
  Boolean,
  Color,
  Component,
  Header,
  Number,
  Object,
  Text,
} from '../value-renderers';

const styles = {
  hasBorder: css({
    border: '0.5px solid rgb(0, 0, 0)',
    padding: '5px',
    position: 'relative',
  }),
  noBorder: css({
    padding: '5px',
    position: 'relative',
  }),
};

const TableContext = createContext({ hasBorder: true, color: '' });
function useTableContext() {
  const context = useContext(TableContext);
  return context;
}

function splitChildren(children: ReactNode) {
  const Rows: ReactElement[] = [];
  let Header: ReactElement | null = null;
  for (const child of Children.toArray(children)) {
    if (typeof child !== 'object' || !isValidElement(child)) {
      // eslint-disable-next-line no-console
      console.error('Invalid Table child:', child);
      throw new Error('invalid Table child');
    } else if (child.type === Table.Row) {
      Rows.push(child);
    } else if (child.type === Table.Header) {
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
  hasBorder?: boolean;
  color?: string;
}

export function Table(props: TableProps) {
  const {
    hasBorder = false,
    bordered = false,
    compact = false,
    interactive = false,
    striped = false,
    color = '',
    children,
    ...tableProps
  } = props;
  const { Header, Rows } = splitChildren(children);

  const tableContextValue = useMemo(
    () => ({ hasBorder, color }),
    [hasBorder, color],
  );
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

function useRowChildren(children: ReactNode) {
  const cells: ReactElement[] = [];
  const { hasBorder, color } = useTableContext();
  for (const child of Children.toArray(children)) {
    if (
      typeof child === 'object' &&
      isValidElement(child) &&
      (child.type === Color ||
        child.type === Boolean ||
        child.type === Text ||
        child.type === Number ||
        child.type === Object ||
        child.type === Header ||
        child.type === Component)
    ) {
      if (child.type === Header) {
        cells.push(
          <th
            key={child.key}
            style={{ color }}
            css={hasBorder ? styles.hasBorder : styles.noBorder}
          >
            {child}
          </th>,
        );
      } else {
        cells.push(
          <td
            key={child.key}
            style={{
              color,
              position: 'relative',
            }}
            css={hasBorder ? styles.hasBorder : styles.noBorder}
          >
            {child}
          </td>,
        );
      }
    } else {
      // eslint-disable-next-line no-console
      console.error('Invalid Row child:', child);
      throw new Error('invalid Row child');
    }
  }
  return { cells };
}

function Row({ children, style = {}, hasBorder = false }: TableProps) {
  const { cells } = useRowChildren(children);
  return (
    <tr style={{ border: hasBorder ? '1px solid black' : '', ...style }}>
      {cells}
    </tr>
  );
}
Table.Row = Row;
Table.Header = ({ children, hasBorder, style }: TableProps) => {
  return (
    <thead>
      <Table.Row hasBorder={hasBorder} style={style}>
        {children}
      </Table.Row>
    </thead>
  );
};
