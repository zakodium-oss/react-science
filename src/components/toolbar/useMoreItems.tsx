import type { ReactNode } from 'react';
import { Children, useLayoutEffect, useState } from 'react';

import type { Overflow } from './Toolbar.tsx';

interface UseMeasureItemSizeProps {
  containerRef: React.RefObject<HTMLDivElement>;
  vertical: boolean;
  overflow: Overflow;
}
interface UseMoreItemsProps extends UseMeasureItemSizeProps {
  children: ReactNode;
}

export function useMoreItems(props: UseMoreItemsProps) {
  const { containerRef, overflow, vertical, children } = props;

  const { itemSize, containerSize } = useMeasureItemSize({
    containerRef,
    overflow,
    vertical,
  });

  const items = Children.toArray(children);

  const availableSize = containerSize - itemSize;
  const maxVisibleItems = Math.max(0, Math.floor(availableSize / itemSize));

  if (
    overflow !== 'collapse' ||
    itemSize === 0 ||
    containerSize === 0 ||
    maxVisibleItems >= items.length
  ) {
    return {
      items,
      moreItems: [],
    };
  }

  return {
    items: items.slice(0, maxVisibleItems),
    moreItems: items.slice(maxVisibleItems),
  };
}

interface Dimension {
  itemSize: number;
  containerSize: number;
}

function getSize(element: Element, vertical?: boolean) {
  const { width, height } = element.getBoundingClientRect();
  return vertical ? height : width;
}

function useMeasureItemSize(options: UseMeasureItemSizeProps) {
  const { overflow, containerRef, vertical } = options;
  const [dimensions, setDimensions] = useState<Dimension>({
    itemSize: 0,
    containerSize: 0,
  });

  useLayoutEffect(() => {
    if (overflow !== 'collapse') {
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    function updateSize() {
      if (!container) return;

      const firstChild = container?.firstElementChild;

      if (!firstChild) {
        return;
      }
      setDimensions({
        itemSize: getSize(firstChild, vertical),
        containerSize: getSize(container, vertical),
      });
    }

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, overflow, vertical]);
  return dimensions;
}
