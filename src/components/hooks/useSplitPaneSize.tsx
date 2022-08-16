import React, { RefObject, useCallback, useRef } from 'react';

import {
  InitialSeparation,
  SideSeparation,
  SplitOrientation,
} from '../SplitPane';

interface HookOptions {
  sideSeparation: SideSeparation;
  orientation: SplitOrientation;
  parentRef: RefObject<HTMLDivElement>;
  onChange: (position: InitialSeparation) => void;
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
        const { clientX, clientY } = event;
        const movementX = clientX - mouseRef.current.x;
        const movementY = clientY - mouseRef.current.y;
        const movement = orientation === 'horizontal' ? movementX : movementY; //the movement expected
        if (type === 'px') {
          setSize(([currentSize]) => {
            if (parentRef.current) {
              const newSize = getValueFromSplitter(
                sideSeparation,
                movement,
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
                    orientation === 'horizontal'
                      ? mouseRef.current.x + movement1
                      : mouseRef.current.x,
                  y:
                    orientation === 'horizontal'
                      ? mouseRef.current.y
                      : mouseRef.current.y + movement1,
                };
              }

              return [newSize, type];
            }

            return [currentSize, type];
          });
        } else if (type === '%') {
          if (parentRef.current) {
            setSize(([currentSize]) => {
              if (parentRef.current) {
                const diffX = (movementX / parentRef.current.clientWidth) * 100;
                const diffY =
                  (movementY / parentRef.current.clientHeight) * 100;
                const diff = orientation === 'horizontal' ? diffX : diffY; //the diffrance expected
                let newSize = getValueFromSplitter(
                  sideSeparation,
                  diff,
                  currentSize,
                  type,
                  { min: 5, max: 95 },
                );
                if (newSize !== currentSize) {
                  let diff1; //the real diffrence
                  if (diff * (newSize - currentSize) > 0) {
                    //check that diff and diff1 have the same sign
                    diff1 =
                      Math.round(
                        (newSize - currentSize + Number.EPSILON) * 100,
                      ) / 100;
                  } else {
                    diff1 =
                      Math.round(
                        (currentSize - newSize + Number.EPSILON) * 100,
                      ) / 100;
                  }
                  mouseRef.current = {
                    moving: true,
                    x:
                      orientation === 'horizontal'
                        ? mouseRef.current.x +
                          (diff1 * parentRef.current.clientWidth) / 100
                        : mouseRef.current.x,
                    y:
                      orientation === 'horizontal'
                        ? mouseRef.current.y
                        : mouseRef.current.y +
                          (diff1 * parentRef.current.clientHeight) / 100,
                  };
                }
                return [newSize, type];
              }

              return [currentSize, type];
            });
          }
        }
      }

      onChange(`${size}${type}` as InitialSeparation);
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
