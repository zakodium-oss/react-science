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

export const TableRow = ({
  children,
  style = {},
  bordered = false,
  ...other
}: TableRowProps) => {
  const { cells } = useRowChildren(children);
  return (
    <tr
      style={{ border: bordered ? '1px solid black' : '', ...style }}
      {...other}
    >
      {cells}
    </tr>
  );
};

function useRowChildren(children: ReactNode) {
  const cells: ReactElement[] = [];
  const { color } = useTableContext();
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
          <th key={child.key} style={{ color }}>
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
