import type { Row, RowData } from '@tanstack/react-table';

import {
  isPreviewTableContext,
  usePreviewTableProps,
} from './preview_table_context.js';
import type { ReactScienceTableFeatures } from './table_features.js';
import { Table } from './table_root.js';

export function PreviewTable<TData extends RowData>(props: {
  row: Row<ReactScienceTableFeatures, TData>;
}) {
  const tablePreviewProps = usePreviewTableProps<TData>();
  return (
    <isPreviewTableContext.Provider value>
      <Table {...tablePreviewProps} noHeader data={[props.row.original]} />
    </isPreviewTableContext.Provider>
  );
}
