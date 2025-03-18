import { Button, Callout } from '@blueprintjs/core';
import type { Meta, StoryObj } from '@storybook/react';
import type { ScrollToOptions } from '@tanstack/react-virtual';
import { useRef, useState } from 'react';

import type {
  Scroller,
  TableProps,
  VirtualScroller,
} from '../../src/components/index.js';
import { Table } from '../../src/components/index.js';
import { table } from '../data/data.js';

import { columns } from './table_columns.js';

type TableRecord = (typeof table)[number];
type StoryTableProps = Pick<TableProps<TableRecord>, 'stickyHeader'>;

type StoryWithScrollTo = StoryObj<StoryTableProps & ScrollToOptions>;
type StoryWithScrollIntoView = StoryObj<
  StoryTableProps & ScrollIntoViewOptions
>;

export default {
  title: 'Components / Table / Auto-scroll',
  args: {
    stickyHeader: true,
  },
} satisfies Meta<StoryTableProps>;

export const ScrollToVirtualRow = {
  args: {
    behavior: 'auto',
    align: 'start',
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
  render: (props: StoryTableProps & ScrollToOptions) => {
    const buttons = useScrollButtons((index) => {
      scrollToRef.current?.scrollIntoView(String(index), {
        align: props.align,
        behavior: props.behavior,
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
            striped
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
} satisfies StoryWithScrollTo;

export const ScrollRowIntoView = {
  args: {
    behavior: 'instant',
    block: 'start',
  },
  argTypes: {
    block: {
      control: {
        type: 'select',
      },
      options: ['nearest', 'center', 'start', 'end'],
    },
  },
  render: (props: StoryTableProps & ScrollIntoViewOptions) => {
    const scrollToRef = useRef<Scroller>();
    const buttons = useScrollButtons((index) =>
      scrollToRef.current?.scrollIntoView(String(index), {
        behavior: props.behavior,
        block: props.block,
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
            striped
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
} satisfies StoryWithScrollIntoView;

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
