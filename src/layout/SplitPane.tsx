/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { ReactNode, DragEvent, useState } from 'react';
import Draggable, { DraggableEvent } from 'react-draggable';

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

export function SplitPane(props: SplitPaneProps) {
  const {
    orientation = 'horizontal',
    sideSeparation = 'start',
    initialSeparation = '200px',
    onChange = () => null,
    children,
  } = props;

  const [widthState, setWidthState] = useState(() => {
    const [, value, type] = /(?<value>^\d+)(?<type>.+)$/.exec(
      initialSeparation as string,
    ) as unknown as [string, string, string];

    return {
      value,
      type,
      initialSeparation,
      separation: `${value}${type}` as InitialSeperation,
    };
  });

  return (
    <div
      css={css([
        { display: 'flex', gap: 5, height: 200 },
        orientation === 'vertical' && { flexDirection: 'column' },
      ])}
    >
      <div
        css={
          sideSeparation === 'start' &&
          getSize(orientation, widthState.separation)
        }
      >
        {children[0]}
      </div>

      {getSeparator(orientation, setWidthState, widthState)}

      <div
        css={
          sideSeparation === 'end' &&
          getSize(orientation, widthState.separation)
        }
      >
        {children[1]}
      </div>
    </div>
  );
}

/*
mouse down
mouse move
mouse up
*/

function getSeparator(
  orientation: SplitOrientation,
  setWidthState: (state: {
    value: number;
    type: string;
    initialSeparation: InitialSeperation;
    separation: InitialSeperation;
  }) => void,
  state: {
    value: number;
    type: string;
    initialSeparation: InitialSeperation;
    separation: InitialSeperation;
  },
) {
  function onDrag(event: DraggableEvent) {
    const { clientX } = event as DragEvent<HTMLDivElement>;

    setWidthState({
      ...state,
      value: clientX,
      separation: `${clientX}${state.type}` as InitialSeperation,
    });
  }

  return (
    <Draggable
      axis={orientation === 'horizontal' ? 'x' : 'y'}
      scale={1}
      onDrag={onDrag}
      defaultPosition={{
        x: 0,
        y: 0,
      }}
    >
      <div
        css={css([
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
        ])}
      >
        {orientation === 'horizontal' && (
          <div css={css({ fontSize: 10 })}>⋮</div>
        )}
        {orientation === 'vertical' && <div css={css({ fontSize: 10 })}>⋯</div>}
      </div>
    </Draggable>
  );
}

function getSize(
  orientation: SplitOrientation,
  separation: InitialSeperation,
): SerializedStyles {
  return css([
    orientation === 'horizontal' && {
      width: separation,
      backgroundColor: 'red',
    },
    orientation === 'vertical' && {
      height: separation,
      backgroundColor: 'red',
    },
  ]);
}
