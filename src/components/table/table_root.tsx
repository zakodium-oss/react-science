import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import type { ElementDragPayload } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { HTMLTable } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { RowData, TableOptions } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { ReactNode, RefObject, TableHTMLAttributes } from 'react';
import { useEffect, useRef } from 'react';

import { assert } from '../utils/index.js';

import { useListContext } from './reorder/list_context.js';
import { ListContextProvider } from './reorder/list_context_provider.js';
import { isItemData } from './reorder/list_item.js';
import { TableBody } from './table_body.js';
import { TableHeader } from './table_header.js';
import type { HeaderCellRenderer } from './table_header_cell.js';
import type {
  Scroller,
  TableColumnDef,
  TableRowTrRenderer,
  VirtualScroller,
} from './table_utils.js';
import { useTableColumns } from './use_table_columns.js';
import { useTableScroll } from './use_table_scroll.js';

const CustomHTMLTable = styled(HTMLTable, {
  shouldForwardProp: (prop) => prop !== 'striped' && prop !== 'stickyHeader',
})<{ stickyHeader: boolean }>`
  /* When using a sticky header, ensure that the borders are located below the last header instead of above the first row. */
  ${(props) => {
    if (!props.stickyHeader) return '';

    return `
      thead tr:last-child {
        box-shadow: inset 0 -1px #11141826;
      }
    
      tbody tr:first-of-type td {
        box-shadow: ${
          props.bordered
            ? 'inset 1px 0 0 0 #11141826 !important'
            : 'none !important'
        };
      }
    
      tbody tr:first-of-type td:first-of-type {
        box-shadow: none !important;
      }
    `;
  }}

  /* Blueprint's HTMLTable \`striped\` prop's implementation is based on nth-child odd / even */
  /* We cannot use that with virtualization, so we override its implementation here. */
  tbody tr.odd td {
    background: ${(props) =>
      props.striped ? 'rgba(143, 153, 168, 0.15)' : 'inherit'};
  }
`;

interface TableBaseProps<TData extends RowData> {
  data: TData[];
  /**
   * Tanstack table definition of columns in the table.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Array<TableColumnDef<TData, any>>;
  /**
   * Show borders between each cell and row of the table.
   */
  bordered?: boolean;
  /**
   * Reduce the padding around table cells.
   */
  compact?: boolean;
  /**
   * When hovering over a row, change its background color and set the pointer
   * to be a cursor.
   */
  interactive?: boolean;
  /**
   * Alternate between gray and white background for each row.
   */
  striped?: boolean;
  /**
   * Enable header rows which stick to the top of the table.
   */
  stickyHeader?: boolean;
  /**
   * Use virtualized rows to optimize rendering.
   * When virtualizing rows, and in order to prevent layout shifts,
   * it is recommended that all columns have a fixed width.
   */
  virtualizeRows?: boolean;

  reactTable?: Omit<
    TableOptions<TData>,
    'data' | 'columns' | 'getCoreRowModel' | 'getSortedRowModel'
  >;
  /**
   * Props which are forwarded to the underlying HTML table element.
   */
  tableProps?: Omit<TableHTMLAttributes<HTMLTableElement>, 'children'>;
  /**
   * An alias for `tableProps.className`. Exists to ensure the Table component
   * can be styled with styled components library (e.g. emotion).
   * If you use both the alias and `tableProps.className`, they will be merged together.
   */
  className?: string;
  /**
   * Override the default row rendering.
   * Make sure to spread the passed `trProps` onto the rendered `<tr>` element.
   */
  renderRowTr?: TableRowTrRenderer<TData>;
  /**
   * Override the columns' header cell rendering.
   */
  renderHeaderCell?: HeaderCellRenderer<TData>;

  /**
   * A ref which will be set with a callback to scroll to a row in the
   * table, specified by the row's ID.
   */
  scrollToRowRef?: RefObject<VirtualScroller | ScrollToOptions | undefined>;

  getRowId?: TableOptions<TData>['getRowId'];

  onRowOrderChanged?: (rows: TData[]) => void;
}

interface RegularTableProps<TData extends RowData>
  extends TableBaseProps<TData> {
  virtualizeRows?: false | undefined;
  scrollToRowRef?: RefObject<Scroller | undefined>;
}

interface VirtualizedTableProps<TData extends RowData>
  extends TableBaseProps<TData> {
  virtualizeRows: true;
  scrollToRowRef?: RefObject<VirtualScroller | undefined>;
  /**
   * For virtualization of the table rows, provide an estimate of the height of each row.
   * @param index The index of the row in the data array.
   * @return The estimated height of the row at the given index.
   */
  estimatedRowHeight: (index: number) => number;
}

export type TableProps<TData extends RowData> =
  | RegularTableProps<TData>
  | VirtualizedTableProps<TData>;

export function Table<TData extends RowData>(props: TableProps<TData>) {
  const {
    data,
    columns,

    bordered = false,
    compact = false,
    interactive = false,
    striped = false,
    stickyHeader = false,

    reactTable,
    tableProps,
    className,
    renderRowTr,
    renderHeaderCell,

    virtualizeRows,
    getRowId,
    onRowOrderChanged,
  } = props;

  const scrollElementRef = useRef<HTMLDivElement>(null);
  const columnDefs = useTableColumns(columns);
  const table = useReactTable<TData>({
    ...reactTable,
    data,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId,
  });

  const tanstackVirtualizer = useVirtualizer({
    enabled: virtualizeRows,
    count: data.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize:
      (props.virtualizeRows && props.estimatedRowHeight) || (() => 0),
    overscan: 5,
  });

  const tableRef = useTableScroll(props, table, tanstackVirtualizer);

  // Make the table component compatible with styled components libraries.
  let finalClassName: string | undefined;
  if (tableProps?.className && className) {
    finalClassName = `${tableProps.className} ${className}`;
  } else if (className) {
    finalClassName = className;
  } else {
    finalClassName = tableProps?.className;
  }

  return (
    <ListContextProvider<TData>
      items={table.getRowModel().rows}
      setItems={(items) => {
        onRowOrderChanged?.(items.map((item) => item.original));
      }}
    >
      <Container virtualizeRows={virtualizeRows} scrollRef={scrollElementRef}>
        <CustomHTMLTable
          ref={tableRef}
          bordered={bordered}
          compact={compact}
          interactive={interactive}
          striped={striped}
          stickyHeader={stickyHeader}
          {...tableProps}
          className={finalClassName}
        >
          <TableHeader
            sticky={stickyHeader}
            headers={table.getFlatHeaders()}
            renderHeaderCell={renderHeaderCell}
          />
          <TableBody
            rows={table.getRowModel().rows}
            renderRowTr={renderRowTr}
            virtualizer={tanstackVirtualizer}
            virtualizeRows={virtualizeRows}
          />
        </CustomHTMLTable>
      </Container>
    </ListContextProvider>
  );
}

const ScrollRefDiv = styled.div`
  height: 100%;
  overflow: auto;
`;

function Container({
  virtualizeRows,
  scrollRef,
  children,
}: {
  virtualizeRows?: boolean;
  children: ReactNode;
  scrollRef: RefObject<HTMLDivElement>;
}) {
  if (virtualizeRows) {
    return (
      <ContainerWithReordering scrollElementRef={scrollRef}>
        {children}
      </ContainerWithReordering>
    );
  }
  return <>{children}</>;
}

interface ContainerWithReorderingProps {
  scrollElementRef: RefObject<HTMLDivElement>;
  children: ReactNode;
}

function ContainerWithReordering<TData extends { id: string }>(
  props: ContainerWithReorderingProps,
) {
  const { scrollElementRef, children } = props;
  const { reorderItem, items } = useListContext();
  useEffect(() => {
    const scrollContainer = scrollElementRef.current;
    assert(scrollContainer, 'Missing scroll container ref');

    function canRespond({ source }: { source: ElementDragPayload }) {
      return isItemData(source.data);
    }

    return combine(
      monitorForElements({
        // TODO: check this
        canMonitor: () => true,
        onDrop({ location, source }) {
          const target = location.current.dropTargets[0];
          if (!target) {
            return;
          }

          const sourceData = source.data;
          const targetData = target.data;
          // TODO: check if isItemData?

          const indexOfTarget = items.findIndex(
            (item) => item.original.id === targetData.item.id,
          );
          if (indexOfTarget === -1) {
            return;
          }

          const closestEdgeOfTarget = extractClosestEdge(targetData);

          reorderItem({
            startIndex: sourceData.index,
            indexOfTarget,
            closestEdgeOfTarget,
          });
        },
      }),
      autoScrollForElements({
        canScroll: canRespond,
        element: scrollContainer,
      }),
    );
  }, [items, reorderItem, scrollElementRef]);

  return <ScrollRefDiv ref={scrollElementRef}>{children}</ScrollRefDiv>;
}
