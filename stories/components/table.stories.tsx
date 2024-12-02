import styled from '@emotion/styled';
import type { ComponentType } from 'react';
import { IdcodeSvgRenderer } from 'react-ocl';

import {
  createTableColumnHelper,
  Table,
  ValueRenderers,
} from '../../src/components/index.js';
import { table } from '../data/data.js';

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
  args: {
    bordered: false,
    compact: false,
    interactive: false,
    striped: false,
    stickyHeader: false,
  },
};

const Truncate = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const columnHelper = createTableColumnHelper<(typeof table)[number]>();
const columns = [
  columnHelper.accessor('ocl.idCode', {
    header: 'Molecule',
    cell: ({ getValue }) => <IdcodeSvgRenderer idcode={getValue()} />,
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    enableSorting: true,
    cell: ({ getValue }) => (
      <Truncate style={{ width: 200 }}>{getValue()}</Truncate>
    ),
  }),
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
      data={table}
    />
  );
}

export function Virtualized({
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
      data={table}
      virtualizeRows
      estimatedRowHeight={() => 172}
    />
  );
}

export function CustomTrRender({
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
      data={table}
      virtualizeRows
      estimatedRowHeight={() => 172}
      renderRowTr={(trProps, row) => (
        <tr
          {...trProps}
          style={{ ...trProps.style, backgroundColor: row.original.color }}
        />
      )}
    />
  );
}
