import { Tag } from '@blueprintjs/core';
import { action } from '@storybook/addon-actions';
import { useRef, useState } from 'react';
import { IdcodeSvgRenderer } from 'react-ocl';

import type { GetTdProps, TableProps } from '../../src/components/index.js';
import {
  createTableColumnHelper,
  Table,
  TableDraggableRowTr,
  TableDragRowHandler,
} from '../../src/components/index.js';
import { table } from '../data/data.js';

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

type TableRecord = (typeof table)[number];

const getTdProps: GetTdProps<TableRecord> = () => ({
  style: {
    verticalAlign: 'middle',
  },
});

const getRowId: TableProps<TableRecord>['getRowId'] = (row) => row.id;

export default {
  title: 'Components / Table / Reordering rows',
  component: Table,
  args: {
    bordered: true,
    compact: false,
    interactive: false,
    striped: false,
    stickyHeader: false,
    getTdProps,
    getRowId,
  },
};

const columnHelper = createTableColumnHelper<(typeof table)[number]>();

const columns = [
  columnHelper.display({
    header: 'Drag',
    cell: () => <TableDragRowHandler />,
  }),
  columnHelper.accessor('ocl.idCode', {
    header: 'Molecule',
    cell: ({ getValue }) => <IdcodeSvgRenderer idcode={getValue()} />,
    meta: { color: 'yellow', width: 400 },
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: ({ getValue }) => getValue(),
  }),
];

export function ReordableRows(props: ControlProps) {
  const [data, setData] = useState(table);
  const scrollableRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={scrollableRef}
      style={{ padding: 12, height: '100%', overflowY: 'auto' }}
    >
      <Table<TableRecord>
        data={data}
        columns={columns}
        estimatedRowHeight={() => 172}
        scrollableElementRef={scrollableRef}
        onRowOrderChanged={(rows) => {
          setData(rows);
          action('onRowOrderChanged')(rows);
        }}
        {...props}
      />
    </div>
  );
}

export function WithCustomPreview(props: ControlProps) {
  const [data, setData] = useState(table);
  const scrollableRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={scrollableRef}
      style={{ padding: 12, height: '100%', overflowY: 'auto' }}
    >
      <Table<TableRecord>
        data={data}
        columns={columns}
        estimatedRowHeight={() => 172}
        renderRowPreview={(row) => <Tag>{row.original.name}</Tag>}
        scrollableElementRef={scrollableRef}
        onRowOrderChanged={(rows) => {
          setData(rows);
          action('onRowOrderChanged')(rows);
        }}
        {...props}
      />
    </div>
  );
}

export function WithCustomRowRendering(props: ControlProps) {
  const [data, setData] = useState(table);
  const scrollableRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={scrollableRef}
      style={{ padding: 12, height: '100%', overflowY: 'auto' }}
    >
      <Table<TableRecord>
        data={data}
        columns={columns}
        estimatedRowHeight={() => 172}
        renderRowTr={(trProps, row) => (
          <TableDraggableRowTr
            trProps={{
              ...trProps,
              style: { ...trProps.style, backgroundColor: row.original.color },
            }}
            row={row}
            renderRowPreview={(row) => <Tag>{row.original.name}</Tag>}
          />
        )}
        scrollableElementRef={scrollableRef}
        onRowOrderChanged={(rows) => {
          setData(rows);
          action('onRowOrderChanged')(rows);
        }}
        {...props}
      />
    </div>
  );
}
