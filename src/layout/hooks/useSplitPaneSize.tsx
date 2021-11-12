import React, { RefObject, useCallback, useRef } from 'react';

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

  const mouseDownCallback = useCallback(() => {
    function onMouseMove(event: MouseEvent) {
      if (mouseRef.current.moving) {
        let changed = true;
        const { clientX, clientY } = event;
        const movementX = clientX - mouseRef.current.x;
        const movementY = clientY - mouseRef.current.y;
        if (type === 'px') {
          setSize(([currentSize]) => {
            if (parentRef.current) {
              const newSize = getValueFromSplitter(
                sideSeparation,
                orientation === 'horizontal' ? movementX : movementY,
                currentSize,
                type,
                {
                  min: 50,
                  max:
                    orientation === 'horizontal'
                      ? parentRef.current.clientWidth - 50
                      : parentRef.current.clientHeight - 50,
                },
              );
              if (newSize === currentSize) {
                changed = false;
              }
              return [newSize, type];
            }

            return [currentSize, type];
          });
        } else if (type === '%') {
          if (parentRef.current) {
            setSize(([currentSize]) => {
              if (parentRef.current) {
                const diffX =
                  (movementX / parentRef.current?.clientWidth) * 100;
                const diffY =
                  (movementY / parentRef.current?.clientHeight) * 100;
                let newSize = getValueFromSplitter(
                  sideSeparation,
                  orientation === 'horizontal' ? diffX : diffY,
                  currentSize,
                  type,
                  { min: 5, max: 95 },
                );
                if (newSize === currentSize) {
                  changed = false;
                }
                return [newSize, type];
              }

              return [currentSize, type];
            });
          }
        }
        if (changed) {
          mouseRef.current = {
            moving: true,
            x: clientX,
            y: clientY,
          };
        }
      }

      onChange(`${size}${type}` as InitialSeperation);
    }

    function mouseUpCallback() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', mouseUpCallback);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', mouseUpCallback);
  }, [onChange, orientation, parentRef, setSize, sideSeparation, size, type]);

  return {
    onMouseUp: () => {
      mouseRef.current.moving = false;
    },
    onMouseDown: (event: React.MouseEvent) => {
      mouseRef.current = {
        moving: true,
        x: event.clientX,
        y: event.clientY,
      };
      mouseDownCallback();
    },
  };
}

function getValueFromSplitter(
  position: 'start' | 'end',
  value: number,
  currentSize: number,
  type: '%' | 'px',
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
