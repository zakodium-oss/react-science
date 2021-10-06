import { useRef, useState, useLayoutEffect, useMemo, RefObject } from 'react';

export type OverflowOrientation = 'vertical' | 'horizontal';

export interface ElementBounding {
  width: number;
  height: number;
}

export interface CheckOverflowResult<T> {
  elementBounding: ElementBounding;
  ref: RefObject<T>;
}

export function useCheckOverflow<
  T extends {
    offsetHeight: number;
    offsetWidth: number;
    scrollHeight: number;
    scrollWidth: number;
  },
>(orientation: OverflowOrientation): CheckOverflowResult<T> {
  const ref = useRef<T | null>(null);
  const [elementBounding, setElementBounding] = useState<{
    isOverFlow: boolean;
    height: number;
    width: number;
  }>({
    isOverFlow: false,
    height: 0,
    width: 0,
  });

  useLayoutEffect(() => {
    if (ref.current) {
      const {
        offsetHeight: height,
        offsetWidth: width,
        scrollHeight,
        scrollWidth,
      } = ref.current;

      let isOverFlow = false;

      if (orientation === 'vertical') {
        isOverFlow = height < scrollHeight;
      } else if (orientation === 'horizontal') {
        isOverFlow = width < scrollWidth;
      }

      setElementBounding({ isOverFlow, width, height });
    }
  }, [orientation]);

  return useMemo(() => ({ ref, elementBounding }), [elementBounding]);
}
