import type { Dispatch, SetStateAction, RefObject } from 'react';

import type {
  SplitPaneDirection,
  SplitPaneSide,
  SplitPaneType,
} from './SplitPane';

interface UseSplitPaneSizeOptions {
  mainSide: SplitPaneSide;
  direction: SplitPaneDirection;
  splitterRef: RefObject<HTMLDivElement>;
  sizeType: SplitPaneType;
  onSizeChange: Dispatch<SetStateAction<[number, SplitPaneType]>>;
}

export function useSplitPaneSize(options: UseSplitPaneSizeOptions) {
  const {
    mainSide,
    direction,
    splitterRef,
    sizeType,
    onSizeChange: setSize,
  } = options;

  function mouseDownCallback() {
    function onMouseMove(event: MouseEvent) {
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

      const value = mainSide === 'start' ? client : parentDimension - client;

      if (sizeType === 'px') {
        setSize(() => {
          const newSize = getValueFromSplitter(value, {
            min: 50,
            max: parentDimension - 50,
          });

          return [newSize, sizeType];
        });
      } else if (sizeType === '%') {
        setSize(() => {
          const valueDiff = (value / parentDimension) * 100;
          let newSize = getValueFromSplitter(valueDiff, {
            min: 5,
            max: 95,
          });

          return [newSize, sizeType];
        });
      }
    }

    function mouseUpCallback() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', mouseUpCallback);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', mouseUpCallback);
  }

  return {
    onMouseDown: mouseDownCallback,
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
