import { Button } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { Meta } from '@storybook/react';
import type { ComponentType } from 'react';
import { useEffect, useRef, useState } from 'react';
import { IdcodeSvgRenderer } from 'react-ocl';

import type {
  ScrollToRow,
  VirtualScrollToRow,
} from '../../src/components/index.js';
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
  virtualizeRows?: boolean;
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
    virtualizeRows: false,
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
  virtualizeRows,
}: ControlProps) {
  return (
    <Table
      bordered={bordered}
      compact={compact}
      interactive={interactive}
      striped={striped}
      stickyHeader={stickyHeader}
      columns={columns}
      virtualizeRows={virtualizeRows}
      estimatedRowHeight={() => 172}
      data={table}
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
  virtualizeRows,
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
      virtualizeRows={virtualizeRows}
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
    scrollBehavior: 'smooth',
    scrollAlign: 'center',
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
    const { rowIndex, buttons } = useScrollButtons();
    const scrollToRef = useRef<VirtualScrollToRow>();
    useEffect(() => {
      if (scrollToRef.current) {
        scrollToRef.current(String(rowIndex), {
          align: props.scrollAlign,
          behavior: props.scrollBehavior,
        });
      }
    }, [rowIndex, props.scrollAlign, props.scrollBehavior]);

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
    scrollBehavior: 'smooth',
    scrollBlock: 'center',
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
    const { rowIndex, buttons } = useScrollButtons();
    const scrollToRef = useRef<ScrollToRow>();
    useEffect(() => {
      if (scrollToRef.current) {
        scrollToRef.current(String(rowIndex), {
          behavior: props.scrollBehavior,
          block: props.scrollBlock,
        });
      }
    }, [rowIndex, props.scrollBehavior, props.scrollBlock]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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

function useScrollButtons() {
  const [rowIndex, setRowIndex] = useState(0);

  const buttons = (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      <Button
        onClick={() => setRowIndex(Math.floor(Math.random() * table.length))}
      >
        Scroll to random row ({table[rowIndex].name})
      </Button>
      <Button onClick={() => setRowIndex(0)}>Scroll to first</Button>
      <Button onClick={() => setRowIndex(table.length - 1)}>
        Scroll to last
      </Button>
      <div>Use controls to change scroll behavior and alignment</div>
    </div>
  );
  return { rowIndex, buttons };
}
