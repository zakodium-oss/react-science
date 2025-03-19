import styled from '@emotion/styled';
import type { Virtualizer } from '@tanstack/react-virtual';
import type { Table as TanstackTable } from '@tanstack/table-core';
import type { ReactNode, RefObject } from 'react';

import { useDropMonitor } from './reorder_rows/use_drop_monitor.js';
import type { TableProps } from './table_root.js';
import { useTableScroll } from './use_table_scroll.js';

const ScrollRefDiv = styled.div`
  height: 100%;
  overflow: auto;
`;

interface ScrollContainerProps {
  /**
   * Whether the table rows are virtualized.
   */
  virtualizeRows?: boolean;
  /**
   * The tanstack virtualizer.
   */
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  /**
   * The tanstack table.
   */
  table: TanstackTable<unknown>;
  /**
   * A ref to the effective scroll container.
   */
  scrollRef: RefObject<Element>;
  /**
   * The user provided ref to attach the scroll callbacks to.
   * It is set by the ScrollContainer component if the table is virtualized.
   * It is an external ref when the table is not virtualized.
   */
  scrollToRowRef?: TableProps<unknown>['scrollToRowRef'];
  isReorderingEnabled: boolean;
  children: ReactNode;
}

export function ScrollContainer(props: ScrollContainerProps) {
  const {
    virtualizeRows,
    table,
    virtualizer,
    scrollRef,
    scrollToRowRef,
    isReorderingEnabled,
    children,
  } = props;
  useTableScroll({
    virtualizeRows,
    table,
    virtualizer,
    scrollRef,
    scrollToRowRef,
  });
  if (virtualizeRows) {
    return (
      <ContainerVirtual
        scrollElementRef={scrollRef}
        isReorderingEnabled={isReorderingEnabled}
      >
        {children}
      </ContainerVirtual>
    );
  }
  return (
    <NoContainer scrollElementRef={scrollRef} enabled={isReorderingEnabled}>
      {children}
    </NoContainer>
  );
}

interface ContainerWithReorderingProps {
  scrollElementRef: RefObject<Element>;
  isReorderingEnabled: boolean;
  children: ReactNode;
}

function ContainerVirtual(props: ContainerWithReorderingProps) {
  const { scrollElementRef, isReorderingEnabled, children } = props;
  useDropMonitor(scrollElementRef, isReorderingEnabled);

  return (
    <ScrollRefDiv ref={scrollElementRef as RefObject<HTMLDivElement>}>
      {children}
    </ScrollRefDiv>
  );
}

interface NoContainerProps {
  scrollElementRef: RefObject<Element>;
  enabled: boolean;
  children: ReactNode;
}

function NoContainer(props: NoContainerProps) {
  const { scrollElementRef, enabled, children } = props;
  useDropMonitor(scrollElementRef, enabled);
  return <>{children}</>;
}
