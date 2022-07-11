/** @jsxImportSource @emotion/react */
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

import * as ValueRenderers from './value-renderers/index';

interface TableProps {
  children?: ReactNode;
  border?: boolean;
}

const styles = {
  border: css({
    border: '0.5px solid rgb(0, 0, 0)',
    padding: '5px',
    position: 'relative',
  }),
  noBorder: css({
    padding: '5px',
    position: 'relative',
  }),
};
const TableContext = createContext({ border: true });
export function useTableContext() {
  const context = useContext(TableContext);
  return context;
}
function splitChildren(children: ReactNode) {
  const Rows: ReactElement[] = [];
  let Header: ReactElement | null = null;
  for (let child of Children.toArray(children)) {
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

export function Table({ children, border = true }: TableProps) {
  const { Header, Rows } = splitChildren(children);
  const tableContextValue = useMemo(() => ({ border }), [border]);
  return (
    <TableContext.Provider value={tableContextValue}>
      <table>
        {Header}
        <tbody>{Rows}</tbody>
      </table>
    </TableContext.Provider>
  );
}
function useRowChildren(children: ReactNode) {
  const cells: ReactElement[] = [];
  const { border } = useTableContext();
  for (let child of Children.toArray(children)) {
    if (
      typeof child === 'object' &&
      isValidElement(child) &&
      (child.type === ValueRenderers.Color ||
        child.type === ValueRenderers.Boolean ||
        child.type === ValueRenderers.Text ||
        child.type === ValueRenderers.Number ||
        child.type === ValueRenderers.Title ||
        child.type === ValueRenderers.Object ||
        child.type === ValueRenderers.Component)
    ) {
      cells.push(
        <td key={child.key} css={border ? styles.border : styles.noBorder}>
          {child}
        </td>,
      );
    } else {
      // eslint-disable-next-line no-console
      console.error('Invalid Row child: ', child);
      throw new Error('invalid Row child');
    }
  }
  return { cells };
}
function Row({ children }: TableProps) {
  const { cells } = useRowChildren(children);
  return <tr>{cells}</tr>;
}
Table.Row = Row;
Table.Header = ({ children }: TableProps) => {
  return (
    <thead>
      <Table.Row>{children}</Table.Row>
    </thead>
  );
};
