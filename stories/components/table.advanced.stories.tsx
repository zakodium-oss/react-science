import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';
import { Button } from '@blueprintjs/core';
import type { ComponentType } from 'react';
import { useState } from 'react';
import { IdcodeSvgRenderer } from 'react-ocl';

import { createTableColumnHelper, Table } from '../../src/components/index.js';
import { RowTrDraggable } from '../../src/components/table/reorder/default_render_row_tr_draggable.js';
import { useItemContext } from '../../src/components/table/reorder/item_context.js';
import { table } from '../data/data.js';

type TableRecord = (typeof table)[number];

export default {
  title: 'Components / Table / Advanced',
  decorators: [
    (Story: ComponentType) => (
      <div style={{ margin: 12, height: '100%', overflowY: 'auto' }}>
        <Story />
      </div>
    ),
  ],
};

const columnHelper = createTableColumnHelper<(typeof table)[number]>();

const columns = [
  columnHelper.display({
    header: 'Drag',
    cell: () => <DragHandle />,
  }),
  columnHelper.accessor('ocl.idCode', {
    header: 'Molecule',
    cell: ({ getValue }) => <IdcodeSvgRenderer idcode={getValue()} />,
    meta: { color: 'yellow', width: 400 },
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    enableSorting: true,
    sortingFn: 'textCaseSensitive',
    cell: ({ getValue }) => getValue(),
  }),
];

export function ReordableRows() {
  const [data, setData] = useState(table);
  return (
    <Table<TableRecord>
      data={data}
      columns={columns}
      estimatedRowHeight={() => 172}
      virtualizeRows
      renderRowTr={(trProps, row) => (
        <RowTrDraggable trProps={trProps} row={row} />
      )}
      onRowOrderChanged={setData}
    />
  );
}

function DragHandle() {
  const { dragHandleRef, state } = useItemContext();
  return (
    <>
      <Button
        icon="drag-handle-horizontal"
        type="button"
        ref={dragHandleRef}
        variant="minimal"
        style={{ cursor: 'grab' }}
      />
      {state.type === 'is-over' && state.closestEdge && (
        <DropIndicator edge={state.closestEdge} />
      )}
    </>
  );
}
