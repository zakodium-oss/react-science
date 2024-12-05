import type { Header, RowData } from '@tanstack/react-table';
import type { CSSProperties } from 'react';

import type { HeaderCellRenderer } from './table_header_cell.js';
import { TableHeaderCell } from './table_header_cell.js';

const headerStyle: CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 10,
  backgroundColor: 'white',
};

interface TableHeaderProps<TData extends RowData> {
  headers: Array<Header<TData, unknown>>;
  sticky: boolean;
  renderHeaderCell?: HeaderCellRenderer<TData>;
}

export function TableHeader<TData extends RowData>(
  props: TableHeaderProps<TData>,
) {
  const { headers, sticky, renderHeaderCell } = props;
  return (
    <thead style={sticky ? headerStyle : undefined}>
      <tr>
        {headers.map((header) => (
          <TableHeaderCell
            key={header.id}
            header={header}
            renderHeaderCell={renderHeaderCell}
          />
        ))}
      </tr>
    </thead>
  );
}
