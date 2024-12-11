import styled from '@emotion/styled';
import type { StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import { IdcodeSvgRenderer } from 'react-ocl';

import {
  createTableColumnHelper,
  Table,
  ValueRenderers,
} from '../../src/components/index.js';
import { table } from '../data/data.js';

type TableRecord = (typeof table)[number];

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
    meta: { color: 'yellow', width: 400 },
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    enableSorting: true,
    sortingFn: 'textCaseSensitive',
    cell: ({ getValue }) => <Truncate>{getValue()}</Truncate>,
    meta: {
      color: 'lightblue',
      width: 200,
    },
  }),
  columnHelper.accessor('rn', { header: 'RN' }),
  columnHelper.accessor('mw', {
    header: 'MW',
    cell: ({ getValue }) => (
      <ValueRenderers.Number value={getValue()} fixed={4} />
    ),
  }),
  columnHelper.accessor('em', {
    header: 'EM',
    sortingFn: 'basic',
    enableSorting: true,
    cell: ({ getValue }) => (
      <ValueRenderers.Number value={getValue()} fixed={4} />
    ),
  }),
  columnHelper.accessor('isExpensive', {
    header: 'Is expensive',
    sortingFn: (row) => {
      return row.original.isExpensive ? 1 : -1;
    },
    enableSorting: true,
  }),
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
        <tr {...trProps} style={{ backgroundColor: row.original.color }} />
      )}
    />
  );
}

export function CustomHeaderCellRender({
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
      tableProps={{
        style: {
          tableLayout: 'fixed',
          width: '100%',
        },
      }}
      renderHeaderCell={(thProps, header) => {
        const backgroundColor = header.column.columnDef.meta?.color;
        const width = header.column.columnDef.meta?.width;
        return (
          <th
            {...thProps}
            style={{ ...thProps.style, backgroundColor, width }}
          />
        );
      }}
    />
  );
}

export const StyledTable = {
  parameters: {
    args: {
      virtualizeRows: true,
    },
  },
  args: {
    virtualizeRows: false,
    striped: true,
  },
  render: (args) => {
    const StyledTableComponent = styled(Table<TableRecord>)`
      border: 1px solid red;
    `;
    const virtualizedProps = args.virtualizeRows ? { virtualizeRows: true, estimatedRowHeight: () => 172 } : {};
    return <StyledTableComponent {...args} {...virtualizedProps} data={table} columns={columns}  />;
  },
} satisfies StoryObj<typeof Table<TableRecord>>;
