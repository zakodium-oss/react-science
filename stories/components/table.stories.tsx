import { ComponentType } from 'react';
import { IdcodeSvgRenderer } from 'react-ocl';

import {
  createTableColumnHelper,
  Table,
  ValueRenderers,
} from '../../src/components/index';
import data from '../data/table.json';

interface ControlProps {
  bordered?: boolean;
  compact?: boolean;
  interactive?: boolean;
  striped?: boolean;
  stickyHeader?: boolean;
}

export default {
  title: 'Components / Table',
  decorators: [
    (Story: ComponentType) => (
      <div style={{ margin: 12, height: '100%', overflowY: 'auto' }}>
        <Story />
      </div>
    ),
  ],
};

const columnHelper = createTableColumnHelper<(typeof data)[number]>();
const columns = [
  columnHelper.accessor('ocl.idCode', {
    header: 'Molecule',
    cell: ({ getValue }) => <IdcodeSvgRenderer idcode={getValue()} />,
  }),
  columnHelper.accessor('name', { header: 'Name', enableSorting: true }),
  columnHelper.accessor('rn', { header: 'RN' }),
  columnHelper.accessor('mw', {
    header: 'MW',
    cell: ({ getValue }) => (
      <ValueRenderers.Number value={getValue()} fixed={4} />
    ),
  }),
  columnHelper.accessor('em', { header: 'EM' }),
  columnHelper.accessor('isExpensive', { header: 'Is expensive' }),
  columnHelper.accessor('color', { header: 'Color' }),
];

export function Control({
  bordered,
  compact,
  interactive,
  striped,
  stickyHeader,
}: ControlProps) {
  return (
    <Table
      bordered={bordered}
      compact={compact}
      interactive={interactive}
      striped={striped}
      stickyHeader={stickyHeader}
      columns={columns}
      data={data}
    />
  );
}
Control.args = {
  bordered: false,
  compact: false,
  interactive: false,
  striped: false,
  sticky: false,
};
