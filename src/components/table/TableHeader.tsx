import type { TableProps } from './Table';
import { TableRow } from './TableRow';

const headerStyle: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 10,
  backgroundColor: 'white',
};

export const TableHeader = ({
  children,
  bordered,
  style,
  sticky,
}: TableProps & { sticky?: boolean }) => {
  return (
    <thead style={sticky ? headerStyle : undefined}>
      <TableRow bordered={bordered} style={style}>
        {children}
      </TableRow>
    </thead>
  );
};
