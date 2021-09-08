/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import React, { ReactNode, useRef, useState } from 'react';

type SplitOrientation = 'vertical' | 'horizontal';
type SideSeparation = 'start' | 'end';
type InitialSeperation = `${number}%` | `${number}px`;

interface SplitPaneProps {
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
    initialSeparation = '200px',
    onChange = () => null,
    children,
  } = props;

  const parentRef = useRef<HTMLDivElement>();
  const initialMousePosition = useRef({ x: 0, y: 0 });

  const [[size, type], setSize] = useState(() => {
    const [, value, type] = /(?<value>^\d+)(?<type>.+)$/.exec(
      initialSeparation as string,
    ) as unknown as [string, string, '%' | 'px'];

    return [Number(value), type];
  });

  const [isMouseMoving, setMouseMoving] = useState(false);
  // MouseMoving dans la ref

  function onMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (isMouseMoving) {
      const { screenX, screenY } = event;

      if (type === 'px') {
        setSize(([currentSize]) => {
          const diffX = screenX - initialMousePosition.current.x;
          const diffY = screenY - initialMousePosition.current.y;

          initialMousePosition.current = {
            x: screenX,
            y: screenY,
          };

          return [
            Number(
              currentSize + (orientation === 'horizontal' ? diffX : diffY),
            ),
            type,
          ];
        });
      } else if (type === '%') {
        if (parentRef.current) {
          setSize([
            orientation === 'horizontal'
              ? (100 * screenX) / parentRef.current.clientWidth
              : (100 * screenY) / parentRef.current.clientHeight,
            type,
          ]);
        }
      }

      onChange(`${size}${type}` as InitialSeperation);
    }
  }

  return (
    <div
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
        onMouseDown={(event) => {
          setMouseMoving(true);
          initialMousePosition.current = { x: event.screenX, y: event.screenY };
        }}
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
