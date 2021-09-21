/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import React, { ReactNode, useRef, useState } from 'react';

import { useSplitPaneSize } from './hooks/useSplitPaneSize';
import { useToggle } from './hooks/useToggle';

export type SplitOrientation = 'vertical' | 'horizontal';
export type SideSeparation = 'start' | 'end';
export type InitialSeperation = `${number}%` | `${number}px`;

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

  const [isDisplayedSidePane, toggle] = useToggle(true);
  const parentRef = useRef<HTMLDivElement>(null);

  const [[size, type], setSize] = useState(() => {
    const [, value, type] = /(?<value>^\d+)(?<type>.+)$/.exec(
      initialSeparation as string,
    ) as unknown as [string, string, '%' | 'px'];

    return [Number(value), type];
  });

  const { onMouseDown, onMouseLeave, onMouseMove, onMouseUp } =
    useSplitPaneSize({
      onChange,
      orientation,
      parentRef,
      sideSeparation,
      state: { setSize, size, type },
    });

  return (
    <div
      ref={parentRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
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
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
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
