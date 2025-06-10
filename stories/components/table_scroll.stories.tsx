import { Button, Callout } from '@blueprintjs/core';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';

import type {
  Scroller,
  TableProps,
  TableScrollIntoViewOptions,
  TableVirtualScrollIntoViewOptions,
  VirtualScroller,
} from '../../src/components/index.js';
import { Table } from '../../src/components/index.js';
import { table } from '../data/data.js';

import { columns } from './table_columns.js';

type TableRecord = (typeof table)[number];
type StoryTableProps = Pick<TableProps<TableRecord>, 'stickyHeader'>;

type VirtualizedScrollTableProps = StoryTableProps &
  TableVirtualScrollIntoViewOptions;
type ScrollTableProps = StoryTableProps & TableScrollIntoViewOptions;

type StoryWithVirtualizedScroll = StoryObj<VirtualizedScrollTableProps>;
type StoryWithScroll = StoryObj<ScrollTableProps>;

export default {
  title: 'Components / Table / Scroll into view',
  args: {
    stickyHeader: false,
  },
} satisfies Meta<StoryTableProps>;

export const ScrollToVirtualRow = {
  args: {
    behavior: 'auto',
    align: 'start',
    flashRow: true,
  },
  argTypes: {
    behavior: {
      control: {
        type: 'select',
      },
      options: ['auto', 'smooth'],
    },
    align: {
      control: {
        type: 'select',
      },
      options: ['auto', 'center', 'start', 'end'],
    },
  },
  render: (props: VirtualizedScrollTableProps) => {
    const buttons = useScrollButtons((index) => {
      scrollToRef.current?.scrollIntoView(String(index), {
        align: props.align,
        behavior: props.behavior,
        flashRow: props.flashRow,
      });
    });
    const scrollToRef = useRef<VirtualScroller>();

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {buttons}
        <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
          <Table<TableRecord>
            {...props}
            columns={columns}
            data={table}
            virtualizeRows
            tableProps={{
              style: { height: '100%' },
            }}
            estimatedRowHeight={() => 172}
            scrollToRowRef={scrollToRef}
          />
        </div>
      </div>
    );
  },
} satisfies StoryWithVirtualizedScroll;

export const ScrollRowIntoView = {
  args: {
    behavior: 'instant',
    block: 'start',
    flashRow: true,
  },
  argTypes: {
    block: {
      control: {
        type: 'select',
      },
      options: ['nearest', 'center', 'start', 'end'],
    },
    behavior: {
      control: {
        type: 'select',
      },
      options: ['auto', 'instant', 'smooth'],
    },
  },
  render: (props: ScrollTableProps) => {
    const scrollToRef = useRef<Scroller>();
    const buttons = useScrollButtons((index) =>
      scrollToRef.current?.scrollIntoView(String(index), {
        behavior: props.behavior,
        block: props.block,
        flashRow: props.flashRow,
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
            columns={columns}
            data={table}
            virtualizeRows={false}
            tableProps={{
              style: { height: '100%' },
            }}
            scrollToRowRef={scrollToRef}
          />
        </div>
      </div>
    );
  },
} satisfies StoryWithScroll;

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
