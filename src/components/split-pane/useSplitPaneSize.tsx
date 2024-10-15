import type { RefObject } from 'react';

import type {
  SplitPaneDirection,
  SplitPaneSide,
  SplitPaneSize,
  SplitPaneType,
} from './SplitPane.js';

interface UseSplitPaneSizeOptions {
  controlledSide: SplitPaneSide;
  direction: SplitPaneDirection;
  splitterRef: RefObject<HTMLDivElement>;
  sizeType: SplitPaneType;
  onSizeChange: (newSize: [number, SplitPaneType]) => void;
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
    let lastSize: [number, SplitPaneType] | null = null;
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
          min: 50,
          max: parentDimension - 50,
        });
        lastSize = [newSize, sizeType];
        onSizeChange(lastSize);
      } else if (sizeType === '%') {
        const valueDiff = (value / parentDimension) * 100;
        const newSize = getValueFromSplitter(valueDiff, {
          min: 5,
          max: 95,
        });
        lastSize = [newSize, sizeType];
        onSizeChange(lastSize);
      }
    }

    function upCallback() {
      window.removeEventListener('pointermove', moveCallback);
      window.removeEventListener('pointerup', upCallback);
      if (lastSize && onResize) {
        onResize(`${lastSize[0]}${lastSize[1]}`);
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
