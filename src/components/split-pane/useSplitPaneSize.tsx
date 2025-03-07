import type { RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { SplitPaneDirection, SplitPaneSide } from './SplitPane.js';
import type {
  ParsedSplitPaneSize,
  SplitPaneSize,
  SplitPaneType,
} from './split_pane_helpers.js';
import { serializeSize } from './split_pane_helpers.js';

interface UseSplitPaneSizeOptions {
  controlledSide: SplitPaneSide;
  direction: SplitPaneDirection;
  splitterRef: RefObject<HTMLDivElement>;
  sizeType: SplitPaneType;
  onSizeChange: (newSize: ParsedSplitPaneSize) => void;
  onResize?: (newSize: SplitPaneSize) => void;
}

export function useSplitPaneSize(options: UseSplitPaneSizeOptions) {
  const {
    controlledSide,
    direction,
    splitterRef,
    sizeType,
    onSizeChange,
    onResize,
  } = options;

  const [isResizing, setIsResizing] = useState(false);
  const onPointerDown = useCallback(() => {
    setIsResizing(true);
  }, []);

  const onResizeRef = useRef(onResize);
  const onSizeChangeRef = useRef(onSizeChange);

  useEffect(() => {
    onResizeRef.current = onResize;
    onSizeChangeRef.current = onSizeChange;
  }, [onResize, onSizeChange]);

  useEffect(() => {
    if (isResizing) {
      let lastSize: ParsedSplitPaneSize | null = null;
      function moveCallback(event: PointerEvent) {
        if (!splitterRef.current) return;
        const { clientX, clientY } = event;
        const parentDiv = splitterRef.current.parentElement as HTMLDivElement;
        const bounds = parentDiv.getBoundingClientRect();
        const parentDimension =
          direction === 'horizontal'
            ? parentDiv.clientWidth
            : parentDiv.clientHeight;

        const client =
          direction === 'horizontal'
            ? clientX - bounds.left
            : clientY - bounds.top;

        const centralizingValue =
          direction === 'horizontal'
            ? splitterRef.current.clientWidth / 2
            : splitterRef.current.clientHeight / 2;

        const value =
          controlledSide === 'start' ? client : parentDimension - client;

        if (sizeType === 'px') {
          const newSize = getValueFromSplitter(value - centralizingValue, {
            min: 0,
            max: parentDimension,
          });
          lastSize = { value: newSize, type: sizeType };
          onSizeChangeRef.current?.(lastSize);
        } else if (sizeType === '%') {
          const valueDiff = (value / parentDimension) * 100;
          const newSize = getValueFromSplitter(valueDiff, {
            min: 0,
            max: 100,
          });
          lastSize = { value: newSize, type: sizeType };
          onSizeChangeRef.current?.(lastSize);
        }
      }
      function upCallback() {
        setIsResizing(false);
        if (lastSize) {
          onResizeRef.current?.(serializeSize(lastSize));
        }
      }

      window.addEventListener('pointermove', moveCallback);
      window.addEventListener('pointerup', upCallback);

      return () => {
        window.removeEventListener('pointermove', moveCallback);
        window.removeEventListener('pointerup', upCallback);
      };
    }
  }, [isResizing, controlledSide, direction, sizeType, splitterRef]);

  return {
    onPointerDown,
    isResizing,
  };
}

function getValueFromSplitter(
  value: number,
  options: { min: number; max: number },
) {
  const newValue = Math.round((value + Number.EPSILON) * 100) / 100;
  return getMinMax(newValue, options);
}

function getMinMax(value: number, options: { min: number; max: number }) {
  return Math.min(Math.max(value, options.min), options.max);
}
