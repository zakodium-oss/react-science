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
function useTableContext() {
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
export interface TableProps {
  children?: ReactNode;
  border?: boolean;
}

export function Table(props: TableProps) {
  const { border = true, children } = props;
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

function Row({ children, border = false }: TableProps) {
  const { cells } = useRowChildren(children);
  return <tr style={{ border: border ? '1px solid black' : '' }}>{cells}</tr>;
}
Table.Row = Row;
Table.Header = ({ children, border = false }: TableProps) => {
  return (
    <thead>
      <Table.Row border={border}>{children}</Table.Row>
    </thead>
  );
};
