import { Button, Callout } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { Meta } from '@storybook/react';
import type { ComponentType } from 'react';
import { useRef, useState } from 'react';
import { IdcodeSvgRenderer } from 'react-ocl';

import type {
  GetTdProps,
  Scroller,
  TableProps,
  VirtualScroller,
} from '../../src/components/index.js';
import {
  createTableColumnHelper,
  Table,
  ValueRenderers,
} from '../../src/components/index.js';
import { table } from '../data/data.js';

type TableRecord = (typeof table)[number];

const getTdProps: GetTdProps<TableRecord> = () => ({
  style: {
    verticalAlign: 'middle',
  },
});

type ControlProps = Pick<
  TableProps<TableRecord>,
  | 'bordered'
  | 'compact'
  | 'interactive'
  | 'striped'
  | 'stickyHeader'
  | 'virtualizeRows'
  | 'getTdProps'
>;

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
    virtualizeRows: false,
    bordered: false,
    compact: false,
    interactive: false,
    striped: false,
    stickyHeader: false,
    getTdProps,
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

export function Control(props: ControlProps) {
  return (
    <Table
      {...props}
      columns={columns}
      estimatedRowHeight={() => 172}
      data={table}
    />
  );
}

export function CustomTrRender(props: ControlProps) {
  return (
    <Table
      {...props}
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

export function CustomHeaderCellRender(props: ControlProps) {
  return (
    <Table
      {...props}
      columns={columns}
      data={table}
      tableProps={{
        style: {
          tableLayout: 'fixed',
          width: '100%',
        },
      }}
      estimatedRowHeight={() => 172}
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

export function StyledTable(props: ControlProps) {
  const StyledTableComponent = styled(Table<TableRecord>)`
    border: 1px solid red;
  `;
  return (
    <StyledTableComponent
      {...props}
      data={table}
      columns={columns}
      estimatedRowHeight={() => 172}
    />
  );
}

export const ScrollToVirtualRow = {
  args: {
    scrollBehavior: 'auto',
    scrollAlign: 'start',
    stickyHeader: true,
    striped: true,
  },
  argTypes: {
    scrollBehavior: {
      control: {
        type: 'select',
      },
      options: ['auto', 'smooth'],
    },
    scrollAlign: {
      control: {
        type: 'select',
      },
      options: ['auto', 'center', 'start', 'end'],
    },
  },
  render: (props) => {
    const buttons = useScrollButtons((index) => {
      scrollToRef.current?.scrollIntoView(String(index), {
        align: props.scrollAlign,
        behavior: props.scrollBehavior,
      });
    });
    const scrollToRef = useRef<VirtualScroller>();

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {buttons}
        <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
          <Table
            {...props}
            virtualizeRows
            data={table}
            tableProps={{
              style: { height: '100%' },
            }}
            columns={columns}
            estimatedRowHeight={() => 172}
            scrollToRowRef={scrollToRef}
          />
        </div>
      </div>
    );
  },
} satisfies Meta;

export const ScrollRowIntoView = {
  args: {
    scrollBehavior: 'instant',
    scrollBlock: 'start',
    stickyHeader: false,
    striped: true,
  },
  argTypes: {
    scrollBehavior: {
      control: {
        type: 'select',
      },
      options: ['auto', 'smooth', 'instant'],
    },
    scrollBlock: {
      control: {
        type: 'select',
      },
      options: ['nearest', 'center', 'start', 'end'],
    },
    virtualizeRows: {
      table: {
        disable: true,
      },
    },
  },
  render: (props) => {
    const scrollToRef = useRef<Scroller>();
    const buttons = useScrollButtons((index) =>
      scrollToRef.current?.scrollIntoView(String(index), {
        behavior: props.scrollBehavior,
        block: props.scrollBlock,
      }),
    );

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {buttons}
        <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
          <Table
            {...props}
            virtualizeRows={false}
            data={table}
            tableProps={{
              style: { height: '100%' },
            }}
            columns={columns}
            scrollToRowRef={scrollToRef}
          />
        </div>
      </div>
    );
  },
} satisfies Meta;

function useScrollButtons(onIndexChanged: (index: number) => void) {
  const [rowIndex, setRowIndex] = useState(0);

  return (
    <Callout title="Scroll to row">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div>Last: {table[rowIndex].name}</div>
        <div>Use controls to change scroll behavior and alignment</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button
            onClick={() => {
              const index = Math.floor(Math.random() * table.length);
              setRowIndex(index);
              onIndexChanged(index);
            }}
          >
            Scroll to random row
          </Button>
          <Button
            onClick={() => {
              setRowIndex(0);
              onIndexChanged(0);
            }}
          >
            Scroll to first item
          </Button>
          <Button
            onClick={() => {
              const index = table.length - 1;
              setRowIndex(index);
              onIndexChanged(index);
            }}
          >
            Scroll to last item
          </Button>
        </div>
      </div>
    </Callout>
  );
}
