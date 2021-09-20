/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import React, { ReactNode, useRef, useState } from 'react';

import { useOnOff } from './hooks/useOnOff';

type SplitOrientation = 'vertical' | 'horizontal';
type SideSeparation = 'start' | 'end';
type InitialSeperation = `${number}%` | `${number}px`;

export interface SplitPaneProps {
  orientation?: SplitOrientation;
  sideSeparation?: SideSeparation;
  initialSeparation?: InitialSeperation;
  onChange?: (position: InitialSeperation) => void;
  children: [ReactNode, ReactNode];
}

const cssStyles = {
  separator: (orientation: SplitOrientation, enabled: boolean) => {
    return css([
      orientation === 'horizontal' && {
        width: '10px',
        cursor: enabled ? 'ew-resize' : 'pointer',
      },
      orientation === 'vertical' && {
        height: '10px',
        cursor: enabled ? 'ns-resize' : 'pointer',
      },
      {
        backgroundColor: 'rgb(247, 247, 247)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        minWidth: 11,
        ':hover': {
          backgroundColor: 'rgb(223, 223, 223)',
        },
      },
    ]);
  },
};

export function SplitPane(props: SplitPaneProps) {
  const {
    orientation = 'horizontal',
    sideSeparation = 'start',
    initialSeparation = '50%',
    onChange = () => null,
    children,
  } = props;

  const [isDisplayedSidePane, , , toggle] = useOnOff(true);
  const parentRef = useRef<HTMLDivElement>(null);

  const [[size, type], setSize] = useState(() => {
    const [, value, type] = /(?<value>^\d+)(?<type>.+)$/.exec(
      initialSeparation as string,
    ) as unknown as [string, string, '%' | 'px'];

    return [Number(value), type];
  });

  const isMouseMoving = useRef({ moving: false, x: 0, y: 0 });

  function onMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (isMouseMoving.current.moving) {
      const { clientX, clientY } = event;

      const movementX = clientX - isMouseMoving.current.x;
      const movementY = clientY - isMouseMoving.current.y;

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

      isMouseMoving.current = {
        moving: true,
        x: clientX,
        y: clientY,
      };

      onChange(`${size}${type}` as InitialSeperation);
    }
  }

  return (
    <div
      ref={parentRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        isMouseMoving.current.moving = false;
      }}
      onMouseUp={() => {
        isMouseMoving.current.moving = false;
      }}
      css={css([
        { display: 'flex', height: '100%', width: '100%' },
        orientation === 'vertical' && { flexDirection: 'column' },
      ])}
    >
      {sideSeparation === 'start' && !isDisplayedSidePane ? (
        <div />
      ) : (
        <div
          css={
            sideSeparation === 'start'
              ? getSize(orientation, `${size}${type}` as InitialSeperation)
              : { flex: '1 1 0%' }
          }
        >
          {children[0]}
        </div>
      )}

      <div
        onDoubleClick={toggle}
        onMouseDown={(event) => {
          isMouseMoving.current = {
            moving: true,
            x: event.clientX,
            y: event.clientY,
          };
        }}
        onMouseUp={() => {
          isMouseMoving.current.moving = false;
        }}
        css={cssStyles.separator(orientation, isDisplayedSidePane)}
      >
        <div css={css({ fontSize: 10 })}>
          {orientation === 'horizontal' ? <span>⋮</span> : <span>⋯</span>}
        </div>
      </div>

      {sideSeparation === 'end' && !isDisplayedSidePane ? (
        <div />
      ) : (
        <div
          css={
            sideSeparation === 'end'
              ? getSize(orientation, `${size}${type}` as InitialSeperation)
              : { flex: '1 1 0%' }
          }
        >
          {children[1]}
        </div>
      )}
    </div>
  );
}

function getSize(
  orientation: SplitOrientation,
  separation: InitialSeperation,
): SerializedStyles {
  return css([
    orientation === 'horizontal' && {
      width: separation,
      display: 'flex',
    },
    orientation === 'vertical' && {
      height: separation,
      display: 'flex',
    },
  ]);
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
