import type { Header, RowData } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import type { CSSProperties } from 'react';

interface TableHeaderCellProps<TData extends RowData> {
  header: Header<TData, unknown>;
}

export function TableHeaderCell<TData extends RowData>(
  props: TableHeaderCellProps<TData>,
) {
  const { header } = props;
  const column = header.column;

  const canSort = column.getCanSort();
  const sorted = column.getIsSorted();

  const style: CSSProperties = {
    position: 'relative',
    cursor: canSort ? 'pointer' : undefined,
  };

  return (
    <th
      style={style}
      onClick={canSort ? column.getToggleSortingHandler() : undefined}
    >
      <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
        {flexRender(header.column.columnDef.header, header.getContext())}
        {sorted
          ? {
              asc: '🔼',
              desc: '🔽',
            }[sorted]
          : null}
      </div>
    </th>
  );
}
