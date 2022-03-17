/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, {
  Children,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
} from 'react';

interface TableProps {
  children?: ReactNode;
}

const styles = {
  border: css({
    border: '0.5px solid rgb(0, 0, 0)',
    padding: '5px',
  }),
  color: css({
    position: 'relative',
  }),
  header: css({
    fontWeight: 'bold',
  }),
  text: css({
    textOverflow: 'ellipsis',
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
Table.ColorCell = ({ value }: { value: string }) => (
  <td css={[styles.color, styles.border]}>
    <div
      style={{
        background: value,
        position: 'absolute',
        top: '2px',
        left: '2px',
        right: '2px',
        bottom: '2px',
      }}
    />
  </td>
);
Table.HeaderCell = ({ value }: { value?: string }) => (
  <th css={[styles.header, styles.border]}>{value}</th>
);
Table.NumberCell = ({ value, fixed }: { value?: number; fixed?: number }) => (
  <td css={styles.border}>
    {value ? (fixed ? value.toFixed(fixed) : value) : ''}
  </td>
);
Table.TextCell = ({ value }: { value?: string }) => (
  <td css={[styles.text, styles.border]}>{value}</td>
);
Table.BooleanCell = ({ value }: { value?: boolean }) => (
  <td css={styles.border}>{value !== undefined ? (value ? '✔' : '✘') : ''}</td>
);
function testRowChildren(children: ReactNode) {
  for (let child of Children.toArray(children)) {
    if (
      typeof child !== 'object' ||
      !isValidElement(child) ||
      (child.type !== Table.ColorCell &&
        child.type !== Table.BooleanCell &&
        child.type !== Table.TextCell &&
        child.type !== Table.NumberCell &&
        child.type !== Table.HeaderCell)
    ) {
      // eslint-disable-next-line no-console
      console.error('Invalid Row child: ', child);
      throw new Error('invalid Row child');
    }
  }
}
Table.Row = ({ children }: TableProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    testRowChildren(children);
  }, [children]);
  return <tr>{children}</tr>;
};

Table.Header = ({ children }: TableProps) => {
  return (
    <thead>
      <Table.Row>{children}</Table.Row>
    </thead>
  );
};
