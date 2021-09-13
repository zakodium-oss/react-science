/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import React, { ReactNode, useRef, useState } from 'react';

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
  separator: (orientation: SplitOrientation) => {
    return css([
      orientation === 'horizontal' && {
        width: '10px',
        cursor: 'ew-resize',
      },
      orientation === 'vertical' && {
        height: '10px',
        cursor: 'ns-resize',
      },
      {
        backgroundColor: 'rgb(247, 247, 247)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
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

  const parentRef = useRef<HTMLDivElement>(null);
  const [[size, type], setSize] = useState(() => {
    const [, value, type] = /(?<value>^\d+)(?<type>.+)$/.exec(
      initialSeparation as string,
    ) as unknown as [string, string, '%' | 'px'];

    return [Number(value), type];
  });

  const [isMouseMoving, setMouseMoving] = useState(false);

  function onMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (isMouseMoving) {
      const { movementX, movementY } = event;

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

      onChange(`${size}${type}` as InitialSeperation);
    }
  }

  return (
    <div
      ref={parentRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setMouseMoving(false)}
      onMouseUp={() => setMouseMoving(false)}
      css={css([
        { display: 'flex', height: '100%', width: '100%' },
        orientation === 'vertical' && { flexDirection: 'column' },
      ])}
    >
      <div
        css={
          sideSeparation === 'start'
            ? getSize(orientation, `${size}${type}` as InitialSeperation)
            : { flex: '1 1 0%' }
        }
      >
        {children[0]}
      </div>

      <div
        onMouseDown={() => setMouseMoving(true)}
        onMouseUp={() => setMouseMoving(false)}
        css={cssStyles.separator(orientation)}
      >
        <div css={css({ fontSize: 10 })}>
          {orientation === 'horizontal' ? <span>⋮</span> : <span>⋯</span>}
        </div>
      </div>

      <div
        css={
          sideSeparation === 'end'
            ? getSize(orientation, `${size}${type}` as InitialSeperation)
            : { flex: '1 1 0%' }
        }
      >
        {children[1]}
      </div>
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
  if (position === 'end') {
    return currentSize - value;
  }

  return currentSize + value;
}
