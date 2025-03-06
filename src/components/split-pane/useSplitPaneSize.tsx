import type { RefObject } from 'react';

import type { SplitPaneDirection, SplitPaneSide } from './SplitPane.js';
import { serializeSize } from './split_pane_helpers.js';
import type {
  ParsedSplitPaneSize,
  SplitPaneSize,
  SplitPaneType,
} from './split_pane_helpers.js';

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

  function downCallback() {
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
        onSizeChange(lastSize);
      } else if (sizeType === '%') {
        const valueDiff = (value / parentDimension) * 100;
        const newSize = getValueFromSplitter(valueDiff, {
          min: 0,
          max: 100,
        });
        lastSize = { value: newSize, type: sizeType };
        onSizeChange(lastSize);
      }
    }

    function upCallback() {
      window.removeEventListener('pointermove', moveCallback);
      window.removeEventListener('pointerup', upCallback);
      if (lastSize && onResize) {
        onResize(serializeSize(lastSize));
      }
    }

    window.addEventListener('pointermove', moveCallback);
    window.addEventListener('pointerup', upCallback);
  }

  return {
    onPointerDown: downCallback,
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
