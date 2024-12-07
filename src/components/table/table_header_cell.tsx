import type { Header, RowData } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

type ThProps = Pick<
  HTMLAttributes<HTMLTableCellElement>,
  'style' | 'onClick' | 'children'
>;

export type HeaderCellRenderer<TData extends RowData> = (
  thProps: ThProps,
  header: Header<TData, unknown>,
) => ReactNode;

interface TableHeaderCellProps<TData extends RowData> {
  header: Header<TData, unknown>;
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
  header: Header<TData, unknown>,
): ThProps {
  const sorted = header.column.getIsSorted();
  const canSort = header.column.getCanSort();
  const style: CSSProperties = {
    position: 'relative',
    cursor: canSort ? 'pointer' : undefined,
  };
  const onClick = canSort ? header.column.getToggleSortingHandler() : undefined;
  const children = (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
      <div>
        {flexRender(header.column.columnDef.header, header.getContext())}
      </div>
      {sorted
        ? {
            asc: '🔼',
            desc: '🔽',
          }[sorted]
        : null}
    </div>
  );

  return { style, children, onClick };
}
