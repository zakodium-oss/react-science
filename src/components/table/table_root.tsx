import { HTMLTable } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { Header, RowData, TableOptions } from '@tanstack/react-table';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { ReactNode, RefObject, TableHTMLAttributes } from 'react';
import { useEffect, useRef } from 'react';
import { match } from 'ts-pattern';

import { DroppedItemProvider } from './reorder_rows/dropped_item_provider.js';
import { ItemOrderProvider } from './reorder_rows/item_order_provider.js';
import { useDropMonitor } from './reorder_rows/use_drop_monitor.js';
import { TableBody } from './table_body.js';
import { TableHeader } from './table_header.js';
import type { HeaderCellRenderer } from './table_header_cell.js';
import type {
  GetTdProps,
  Scroller,
  TableColumnDef,
  TableRowPreviewRenderer,
  TableRowTrRenderer,
  VirtualScroller,
} from './table_utils.js';
import { useTableColumns } from './use_table_columns.js';
import { useTableScroll } from './use_table_scroll.js';

const CustomHTMLTable = styled(HTMLTable, {
  shouldForwardProp: (prop) =>
    prop !== 'striped' && prop !== 'stickyHeader' && prop !== 'noHeader',
})<{ stickyHeader: boolean; noHeader: boolean }>`
  /* When using a sticky header, ensure that the borders are located below the last header instead of above the first row. */
  ${(props) =>
    match(props)
      .with({ stickyHeader: false, noHeader: false }, () => '')
      .otherwise(
        (props) => `
      thead tr:last-child {
        box-shadow: inset 0 -1px #11141826;
      }
    
      tbody tr:first-of-type td {
        box-shadow: ${match(props)
          .with(
            { bordered: true },
            () => 'inset 1px 0 0 0 #11141826 !important',
          )
          .otherwise(() => 'none !important')};
      }
    
      tbody tr:first-of-type td:first-of-type {
        box-shadow: none !important;
      }
    `,
      )}

  /* Blueprint's HTMLTable \`striped\` prop's implementation is based on nth-child odd / even */
  /* We cannot use that with virtualization, so we override its implementation here. */
  tbody tr.odd td {
    background: ${(props) =>
      props.striped ? 'rgba(143, 153, 168, 0.15)' : 'inherit'};
  }
`;

interface TableBaseProps<TData extends RowData> {
  /**
   * The original data to display in the table.
   */
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
   * Do not render the table header.
   */
  noHeader?: boolean;
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
   * Pass custom props to the `<td>`.
   * The callback is called for each cell and receives the row's data.
   * The returned properties are spread onto the `<td>` element.
   */
  getTdProps?: GetTdProps<TData>;

  /**
   * A ref which will be set with a callback to scroll to a row in the
   * table, specified by the row's ID.
   */
  scrollToRowRef?: RefObject<VirtualScroller | ScrollToOptions | undefined>;

  /**
   * An accessor which should return a unique identifier for the row.
   */
  getRowId?: TableOptions<TData>['getRowId'];

  /**
   * Called when the user changed the order of the rows.
   * Specifying this callback enables row reordering by drag and drop.
   * Make sure to specify `getRowId` and not to use column sorting when you
   * enable row reordering.
   * Use the `TableDragRowHandler` component within table cells to provide the
   * drag and drop interface for reordering rows.
   * @param rows The rows in their new order.
   */
  onRowOrderChanged?: (rows: TData[]) => void;

  /**
   * Render function to customize the preview of the row being dragged
   * when reordering.
   * It receives the row being dragged.
   * Ignored when using custom row rendering with `renderRowTr`.
   */
  renderRowPreview?: TableRowPreviewRenderer<TData>;
}

interface RegularTableProps<TData extends RowData>
  extends TableBaseProps<TData> {
  virtualizeRows?: false | undefined;
  scrollToRowRef?: RefObject<Scroller | undefined>;
  /**
   * Specify a custom scrollable reference, which will be used to
   * automatically scroll the table when reordering elements.
   * By default, the table itself is used as the scrollable element, but
   * you must style it to make it scrollable.
   */
  scrollableElementRef?: RefObject<Element>;
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
    noHeader = false,
    stickyHeader = false,

    reactTable,
    tableProps,
    className,
    renderRowTr,
    renderHeaderCell,
    getTdProps,

    virtualizeRows,
    getRowId,
    onRowOrderChanged,
    renderRowPreview,
  } = props;
  const isReorderingEnabled = !!onRowOrderChanged;
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

  const tableHeaders = table.getFlatHeaders();
  useCheckProps(
    props as TableProps<unknown>,
    tableHeaders as Array<Header<unknown, unknown>>,
  );
  return (
    <DroppedItemProvider>
      <ItemOrderProvider
        items={table.getRowModel().rows}
        onOrderChanged={(items) => {
          onRowOrderChanged?.(items.map((item) => item.original));
        }}
      >
        <Container
          virtualizeRows={virtualizeRows}
          scrollRef={
            virtualizeRows
              ? scrollElementRef
              : props.scrollableElementRef || tableRef
          }
          isReorderingEnabled={isReorderingEnabled}
        >
          <CustomHTMLTable
            ref={tableRef}
            bordered={bordered}
            compact={compact}
            interactive={interactive}
            striped={striped}
            noHeader={noHeader}
            stickyHeader={stickyHeader}
            {...tableProps}
            className={finalClassName}
          >
            {!noHeader && (
              <TableHeader
                sticky={stickyHeader}
                headers={tableHeaders}
                renderHeaderCell={renderHeaderCell}
              />
            )}
            <TableBody
              rows={table.getRowModel().rows}
              renderRowTr={renderRowTr}
              getTdProps={getTdProps}
              virtualizer={tanstackVirtualizer}
              virtualizeRows={virtualizeRows}
              renderRowPreview={renderRowPreview}
              isReorderingEnabled={isReorderingEnabled}
            />
          </CustomHTMLTable>
        </Container>
      </ItemOrderProvider>
    </DroppedItemProvider>
  );
}

const ScrollRefDiv = styled.div`
  height: 100%;
  overflow: auto;
`;

interface ContainerProps {
  virtualizeRows?: boolean;
  children: ReactNode;
  scrollRef: RefObject<Element>;
  isReorderingEnabled: boolean;
}

function Container(props: ContainerProps) {
  const { virtualizeRows, scrollRef, isReorderingEnabled, children } = props;
  if (virtualizeRows) {
    return (
      <ContainerVirtual
        scrollElementRef={scrollRef}
        enabled={isReorderingEnabled}
      >
        {children}
      </ContainerVirtual>
    );
  }
  return (
    <ContainerTable scrollElementRef={scrollRef} enabled={isReorderingEnabled}>
      {children}
    </ContainerTable>
  );
}

interface ContainerWithReorderingProps {
  scrollElementRef: RefObject<Element>;
  enabled: boolean;
  children: ReactNode;
}

function ContainerVirtual(props: ContainerWithReorderingProps) {
  const { scrollElementRef, enabled, children } = props;
  useDropMonitor(scrollElementRef, enabled);

  return (
    <ScrollRefDiv ref={scrollElementRef as RefObject<HTMLDivElement>}>
      {children}
    </ScrollRefDiv>
  );
}

interface ContainerTableProps {
  scrollElementRef: RefObject<Element>;
  enabled: boolean;
  children: ReactNode;
}
function ContainerTable(props: ContainerTableProps) {
  const { scrollElementRef, enabled, children } = props;
  useDropMonitor(scrollElementRef, enabled);
  return <>{children}</>;
}

function useCheckProps(
  props: TableProps<unknown>,
  headers: Array<Header<unknown, unknown>>,
) {
  const { onRowOrderChanged, getRowId } = props;
  useEffect(() => {
    if (onRowOrderChanged && !getRowId) {
      // eslint-disable-next-line no-console
      console.warn(
        'When reordering rows is enabled via the `onRowOrderChanged` prop, the `getRowId` prop must be provided to identify each row unambiguously.',
      );
    }
    if (headers.some((header) => header.column.getCanSort())) {
      // eslint-disable-next-line no-console
      console.warn(
        'When reordering rows is enabled via the `onRowOrderChanged` prop, none of the columns should be sortable as data order will be overriden by internal sorting.',
      );
    }
  }, [onRowOrderChanged, getRowId, headers]);
}
