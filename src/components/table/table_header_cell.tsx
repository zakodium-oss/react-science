import { Icon } from '@blueprintjs/core';
import type { IconName } from '@blueprintjs/icons';
import type { Header, RowData, SortFnOption } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import type { HTMLAttributes, ReactNode } from 'react';
import { match } from 'ts-pattern';

import type { ReactScienceTableFeatures } from './table_features.js';

type ThProps = Pick<
  HTMLAttributes<HTMLTableCellElement>,
  'style' | 'onClick' | 'children'
>;

export type HeaderCellRenderer<TData extends RowData> = (
  thProps: ThProps,
  header: Header<ReactScienceTableFeatures, TData, unknown>,
) => ReactNode;

interface TableHeaderCellProps<TData extends RowData> {
  header: Header<ReactScienceTableFeatures, TData, unknown>;
  renderHeaderCell?: HeaderCellRenderer<TData>;
}

export function TableHeaderCell<TData extends RowData>(
  props: TableHeaderCellProps<TData>,
) {
  const { header, renderHeaderCell } = props;
  const thProps = getThProps(header);

  if (renderHeaderCell) {
    return renderHeaderCell(thProps, header);
  }
  return <th {...thProps} />;
}

function getThProps<TData extends RowData>(
  header: Header<ReactScienceTableFeatures, TData, unknown>,
): ThProps {
  const { column } = header;

  const sorted = column.getIsSorted();
  const canSort = column.getCanSort();
  const sortingIcon = getSortingIcon(column.columnDef.sortFn)[sorted || 'asc'];

  return {
    onClick: canSort ? column.getToggleSortingHandler() : undefined,
    style: {
      position: 'relative',
      cursor: canSort ? 'pointer' : undefined,
      ...column.columnDef.meta?.thStyle,
    },
    children: (
      <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
        <div>{flexRender(column.columnDef.header, header.getContext())}</div>
        {sorted && <Icon icon={sortingIcon} />}
      </div>
    ),
  };
}

function getSortingIcon<TData extends RowData>(
  type: SortFnOption<ReactScienceTableFeatures, TData> | undefined,
): { asc: IconName; desc: IconName } {
  return match<
    SortFnOption<ReactScienceTableFeatures, TData> | undefined,
    { asc: IconName; desc: IconName }
  >(type)
    .with(
      'auto',
      'datetime',
      'alphanumeric',
      'alphanumericCaseSensitive',
      () => ({
        asc: 'sort-asc',
        desc: 'sort-desc',
      }),
    )
    .with('text', 'textCaseSensitive', () => ({
      asc: 'sort-alphabetical',
      desc: 'sort-alphabetical-desc',
    }))
    .with('basic', () => ({
      asc: 'sort-numerical',
      desc: 'sort-numerical-desc',
    }))
    .otherwise(() => ({ asc: 'sort-asc', desc: 'sort-desc' }));
}
