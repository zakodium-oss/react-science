import styled from '@emotion/styled';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';

import { Table, TableRowTr } from '../../src/components/index.js';
import type { GetTdProps, TableProps } from '../../src/components/index.js';
import { table } from '../data/data.js';

import { columns } from './table_columns.js';

type TableRecord = (typeof table)[number];

type StoryTableProps = TableProps<TableRecord>;
type Story = StoryObj<StoryTableProps>;

type StoryFunction = StoryFn<StoryTableProps>;

const getTdProps: GetTdProps<TableRecord> = () => ({
  style: {
    verticalAlign: 'middle',
  },
});

export default {
  title: 'Components / Table',
  component: Table,
  decorators: [
    (Story: ComponentType) => (
      <div style={{ margin: 12, height: '100%', overflowY: 'auto' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    noHeader: false,
    virtualizeRows: true,
    bordered: false,
    compact: false,
    interactive: false,
    striped: false,
    stickyHeader: false,
    getTdProps,
    data: table,
    columns,
    estimatedRowHeight: () => 172,
  },
  argTypes: {
    estimatedRowHeight: {
      table: {
        disable: true,
      },
    },
    data: {
      table: {
        disable: true,
      },
    },
    columns: {
      table: {
        disable: true,
      },
    },
    getTdProps: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<TableProps<TableRecord>>;

export const Control = {} satisfies Story;

export const CustomTrRender = {
  args: {
    renderRowTr: (trProps, row) => (
      <TableRowTr
        row={row}
        trProps={{ ...trProps, style: { backgroundColor: row.original.color } }}
      />
    ),
  },
} satisfies Story;

export const CustomHeaderCellRender = {
  args: {
    tableProps: {
      style: {
        tableLayout: 'fixed',
        width: '100%',
      },
    },
    renderHeaderCell: (thProps, header) => {
      const backgroundColor = header.column.columnDef.meta?.color;
      const width = header.column.columnDef.meta?.width;
      return (
        <th {...thProps} style={{ ...thProps.style, backgroundColor, width }} />
      );
    },
  },
} satisfies Story;

export const StyledTable: StoryFunction = (props) => {
  const StyledTableComponent = styled(Table<TableRecord>)`
    border: 1px solid red;
  `;
  return <StyledTableComponent {...props} />;
};
