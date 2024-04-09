/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  Children,
  HTMLAttributes,
  isValidElement,
  ReactElement,
  ReactNode,
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

import type { TableProps } from './Table';
import { useTableContext } from './tableContext';

export type TableRowProps = TableProps & HTMLAttributes<HTMLTableRowElement>;

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

export const TableRow = ({
  children,
  style = {},
  hasBorder = false,
  ...other
}: TableRowProps) => {
  const { cells } = useRowChildren(children);
  return (
    <tr
      style={{ border: hasBorder ? '1px solid black' : '', ...style }}
      {...other}
    >
      {cells}
    </tr>
  );
};

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
