import { useLayoutEffect, useState } from 'react';

import type { Overflow } from './Toolbar.tsx';

interface UseCheckOverflowOptions {
  containerRef: React.RefObject<HTMLDivElement>;
  vertical: boolean;
  overflow: Overflow;
}

export function useCheckOverflow(options: UseCheckOverflowOptions) {
  const { containerRef, overflow, vertical } = options;
  const [isOverflow, setIsOverflow] = useState(false);
  useLayoutEffect(() => {
    if (overflow !== 'collapse') return;

    const container = containerRef.current;

    if (!container) return;

    const checkOverflow = () => {
      let isOverflow = false;
      if (vertical) {
        isOverflow = container.scrollHeight > container.clientHeight;
      } else {
        isOverflow = container.scrollWidth > container.clientWidth;
      }
      setIsOverflow(isOverflow);
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, overflow, vertical]);
  return isOverflow;
}
