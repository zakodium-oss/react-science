/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  createContext,
  CSSProperties,
  ReactNode,
  useContext,
  useRef,
  useState,
} from 'react';

import { useSplitPaneSize } from './hooks/useSplitPaneSize';
import { useToggle } from './hooks/useToggle';

export type SplitOrientation = 'vertical' | 'horizontal';
export type SideSeparation = 'start' | 'end';
export type InitialSeparation = `${number}%` | `${number}px`;
export type SeparationType = '%' | 'px';

export interface SplitPaneProps {
  orientation?: SplitOrientation;
  sideSeparation?: SideSeparation;
  initialSeparation?: InitialSeparation;
  onChange?: (position: InitialSeparation) => void;
  children: [ReactNode, ReactNode];
}

const cssStyles = {
  item: (
    isClosed: boolean,
    isChoosenSide: boolean,
    orientation: SplitOrientation,
    size: number,
    type: SeparationType,
  ) => {
    if (isClosed) {
      return isChoosenSide
        ? { display: 'none' }
        : { flex: '1 1 0%', display: 'flex' };
    } else {
      return isChoosenSide
        ? getSize(orientation, { size, type })
        : { flex: '1 1 0%', display: 'flex' };
    }
  },
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

const splitPaneContext = createContext<boolean>(false);

export function useSplitPaneContext() {
  return useContext(splitPaneContext);
}

export function SplitPane(props: SplitPaneProps) {
  const isParentClosed = useSplitPaneContext();

  const {
    orientation = 'horizontal',
    sideSeparation = 'start',
    initialSeparation = '50%',
    onChange = () => null,
    children,
  } = props;

  const [isSidePaneClosed, toggle] = useToggle(false);
  const parentRef = useRef<HTMLDivElement>(null);

  const [[size, type], setSize] = useState(() => {
    const [, value, type] = /(?<value>^\d+)(?<type>.+)$/.exec(
      initialSeparation as string,
    ) as unknown as [string, string, SeparationType];

    return [Number(value), type];
  });

  const { onMouseDown, onMouseUp } = useSplitPaneSize({
    onChange,
    orientation,
    parentRef,
    sideSeparation,
    state: { setSize, size, type },
  });

  const isFinalClosed = isParentClosed ? true : isSidePaneClosed;

  return (
    <div
      ref={parentRef}
      onMouseUp={onMouseUp}
      css={css([
        { display: 'flex', height: '100%', width: '100%' },
        orientation === 'vertical' && { flexDirection: 'column' },
      ])}
    >
      <splitPaneContext.Provider
        value={isFinalClosed && sideSeparation === 'start'}
      >
        <div
          style={cssStyles.item(
            isFinalClosed,
            sideSeparation === 'start',
            orientation,
            size,
            type,
          )}
        >
          {children[0]}
        </div>
      </splitPaneContext.Provider>

      <div
        onDoubleClick={toggle}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        css={cssStyles.separator(orientation, !isFinalClosed)}
      >
        <div css={css({ fontSize: 10 })}>
          {orientation === 'horizontal' ? <span>⋮</span> : <span>⋯</span>}
        </div>
      </div>

      <splitPaneContext.Provider
        value={isFinalClosed && sideSeparation === 'end'}
      >
        <div
          style={cssStyles.item(
            isFinalClosed,
            sideSeparation === 'end',
            orientation,
            size,
            type,
          )}
        >
          {children[1]}
        </div>
      </splitPaneContext.Provider>
    </div>
  );
}

function getSize(
  orientation: SplitOrientation,
  separation: {
    size: number;
    type: '%' | 'px';
  },
): CSSProperties {
  const style: CSSProperties = {
    display: 'flex',
  };

  if (orientation === 'horizontal') {
    style.width = `${separation.size}${separation.type}`;
  } else {
    style.height = `${separation.size}${separation.type}`;
  }

  return style;
}
