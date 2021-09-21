import { MouseEvent, RefObject, useRef } from 'react';

import {
  InitialSeperation,
  SideSeparation,
  SplitOrientation,
} from '../SplitPane';

interface HookOptions {
  sideSeparation: SideSeparation;
  orientation: SplitOrientation;
  parentRef: RefObject<HTMLDivElement>;
  onChange: (position: InitialSeperation) => void;
  state: {
    size: number;
    type: '%' | 'px';
    setSize: React.Dispatch<React.SetStateAction<[number, '%' | 'px']>>;
  };
}

export function useSplitPaneSize(options: HookOptions) {
  const {
    state: { size, type, setSize },
    sideSeparation,
    orientation,
    parentRef,
    onChange,
  } = options;

  const mouseRef = useRef({ moving: false, x: 0, y: 0 });

  function onMouseMove(event: MouseEvent) {
    if (mouseRef.current.moving) {
      const { clientX, clientY } = event;

      const movementX = clientX - mouseRef.current.x;
      const movementY = clientY - mouseRef.current.y;

      if (type === 'px') {
        setSize(([currentSize]) => {
          return [
            getValueFromSplitter(
              sideSeparation,
              orientation === 'horizontal' ? movementX : movementY,
              currentSize,
            ),
            type,
          ];
        });
      } else if (type === '%') {
        if (parentRef.current) {
          setSize(([currentSize]) => {
            if (parentRef.current) {
              const diffX = (movementX / parentRef.current?.clientWidth) * 100;
              const diffY = (movementY / parentRef.current?.clientHeight) * 100;

              return [
                getValueFromSplitter(
                  sideSeparation,
                  orientation === 'horizontal' ? diffX : diffY,
                  currentSize,
                ),
                type,
              ];
            }

            return [currentSize, type];
          });
        }
      }

      mouseRef.current = {
        moving: true,
        x: clientX,
        y: clientY,
      };
    }

    onChange(`${size}${type}` as InitialSeperation);
  }

  return {
    onMouseMove,
    onMouseLeave: () => {
      mouseRef.current.moving = false;
    },
    onMouseUp: () => {
      mouseRef.current.moving = false;
    },
    onMouseDown: (event: MouseEvent) => {
      mouseRef.current = {
        moving: true,
        x: event.clientX,
        y: event.clientY,
      };
    },
  };
}

function getValueFromSplitter(
  position: 'start' | 'end',
  value: number,
  currentSize: number,
) {
  let val = 0;

  if (position === 'end') {
    val = currentSize - value;
  } else {
    val = currentSize + value;
  }

  return Math.round((val + Number.EPSILON) * 100) / 100;
}
