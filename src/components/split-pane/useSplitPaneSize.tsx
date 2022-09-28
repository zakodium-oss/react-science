import {
  MouseEvent as ReactMouseEvent,
  Dispatch,
  SetStateAction,
  RefObject,
  useRef,
} from 'react';

import type {
  SplitPaneSide,
  SplitPaneDirection,
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

  const mouseRef = useRef({ moving: false, x: 0, y: 0 });

  function mouseDownCallback(event: ReactMouseEvent) {
    mouseRef.current = {
      moving: true,
      x: event.clientX,
      y: event.clientY,
    };

    function onMouseMove(event: MouseEvent) {
      if (!splitterRef.current || !mouseRef.current.moving) return;
      const parentDiv = splitterRef.current.parentElement as HTMLDivElement;
      const { clientX, clientY } = event;
      const movementX = clientX - mouseRef.current.x;
      const movementY = clientY - mouseRef.current.y;
      const movement = direction === 'horizontal' ? movementX : movementY;
      if (sizeType === 'px') {
        setSize(([currentSize]) => {
          const newSize = getValueFromSplitter(
            mainSide,
            movement,
            currentSize,
            {
              min: 50,
              max:
                direction === 'horizontal'
                  ? parentDiv.clientWidth - 50
                  : parentDiv.clientHeight - 50,
            },
          );
          if (newSize !== currentSize) {
            let movement1: number; //the real movement
            if (movement * (newSize - currentSize) > 0) {
              //check that movement and movement1 have the same sign
              movement1 = newSize - currentSize;
            } else {
              movement1 = currentSize - newSize;
            }
            mouseRef.current = {
              //set x y of the separation
              moving: true,
              x:
                direction === 'horizontal'
                  ? mouseRef.current.x + movement1
                  : mouseRef.current.x,
              y:
                direction === 'horizontal'
                  ? mouseRef.current.y
                  : mouseRef.current.y + movement1,
            };
          }

          return [newSize, sizeType];
        });
      } else if (sizeType === '%') {
        setSize(([currentSize]) => {
          const diffX = (movementX / parentDiv.clientWidth) * 100;
          const diffY = (movementY / parentDiv.clientHeight) * 100;
          const diff = direction === 'horizontal' ? diffX : diffY; //the diffrance expected
          let newSize = getValueFromSplitter(mainSide, diff, currentSize, {
            min: 5,
            max: 95,
          });
          if (newSize !== currentSize) {
            let diff1; // the real difference
            if (diff * (newSize - currentSize) > 0) {
              // check that diff and diff1 have the same sign
              diff1 =
                Math.round((newSize - currentSize + Number.EPSILON) * 100) /
                100;
            } else {
              diff1 =
                Math.round((currentSize - newSize + Number.EPSILON) * 100) /
                100;
            }
            mouseRef.current = {
              moving: true,
              x:
                direction === 'horizontal'
                  ? mouseRef.current.x + (diff1 * parentDiv.clientWidth) / 100
                  : mouseRef.current.x,
              y:
                direction === 'horizontal'
                  ? mouseRef.current.y
                  : mouseRef.current.y + (diff1 * parentDiv.clientHeight) / 100,
            };
          }
          return [newSize, sizeType];
        });
      }
    }

    function mouseUpCallback() {
      mouseRef.current.moving = false;
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
  position: 'start' | 'end',
  value: number,
  currentSize: number,
  options: { min: number; max: number },
) {
  let val = 0;
  if (position === 'end') {
    val = currentSize - value;
  } else {
    val = currentSize + value;
  }

  const newValue = Math.round((val + Number.EPSILON) * 100) / 100;
  return getMinMax(newValue, options);
}

function getMinMax(value: number, options: { min: number; max: number }) {
  return Math.min(Math.max(value, options.min), options.max);
}
