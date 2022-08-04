/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Children, isValidElement, ReactElement, ReactNode } from 'react';

import * as ValueRenderers from './value-renderers/index';

interface TableProps {
  children?: ReactNode;
}

const styles = {
  border: css({
    border: '0.5px solid rgb(0, 0, 0)',
    padding: '5px',
    position: 'relative',
  }),
};
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
      // eslint-disable-next-line no-console
      console.error('Invalid Table child: ', child);
      throw new Error('invalid Table child');
    }
  }
  return { Rows, Header };
}

export function Table({ children }: TableProps) {
  const { Header, Rows } = splitChildren(children);
  return (
    <table>
      {Header}
      <tbody>{Rows}</tbody>
    </table>
  );
}
function rowChildren(children: ReactNode) {
  const cells: ReactElement[] = [];
  for (let child of Children.toArray(children)) {
    if (
      typeof child === 'object' &&
      isValidElement(child) &&
      (child.type === ValueRenderers.Color ||
        child.type === ValueRenderers.Boolean ||
        child.type === ValueRenderers.Text ||
        child.type === ValueRenderers.Number ||
        child.type === ValueRenderers.Title ||
        child.type === ValueRenderers.Object)
    ) {
      cells.push(<td css={styles.border}>{child}</td>);
    } else {
      // eslint-disable-next-line no-console
      console.error('Invalid Row child: ', child);
      throw new Error('invalid Row child');
    }
  }
  return { cells };
}
Table.Row = function TableRow({ children }: TableProps) {
  const { cells } = rowChildren(children);
  return <tr>{cells}</tr>;
};

Table.Header = function TableHeader({ children }: TableProps) {
  return (
    <thead>
      <Table.Row>{children}</Table.Row>
    </thead>
  );
};
