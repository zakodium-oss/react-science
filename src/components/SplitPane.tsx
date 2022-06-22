/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  createContext,
  CSSProperties,
  ReactNode,
  useContext,
  useRef,
  useState,
  useCallback,
  RefObject,
} from 'react';
import useResizeObserver from 'use-resize-observer';

import { useSplitPaneSize } from './hooks/useSplitPaneSize';
import { useToggle } from './hooks/useToggle';

export type SplitOrientation = 'vertical' | 'horizontal';
export type SideSeparation = 'start' | 'end';
export type InitialSeparation = `${number}%` | `${number}px`;
export type SeparationType = '%' | 'px';

export interface SplitPaneProps {
  /**
   * Should we split horizontally or vertically
   * @default 'horizontal'
   */
  orientation?: SplitOrientation;
  /**
   * Defines towards which side we will close the Pane when double clicking on the Split.
   * If the value is 'start' it will be closed to the
   * 'left' or 'top' (depending if it is an horizontal or vertical SplitPane)
   * @default 'start'
   */
  sideSeparation?: SideSeparation;
  /**
   * What should be the relative split value. By default both side will have 50% of the space.
   * Units can either be in '%' or in 'px'
   * @default '50%''
   */
  initialSeparation?: InitialSeparation;
  /**
   * Defines if it will be closed when loading. The side that is closed depends on `sideSeparation` value
   * @default false
   */
  initialClosed?: boolean;
  /**
   * Define when the split panel should be closed by setting the minimum size in Pixel 'px'
   * @default undefined
   */
  minimumSize?: number;
  /**
   * @default () => null
   */
  onChange?: (position: InitialSeparation) => void;
  /**
   * Array containing the 2 ReactNode to show on the 2 sides of the SplitPane
   */
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
    initialClosed = false,
    minimumSize,
    onChange = () => null,
    children,
  } = props;

  const [isSidePaneClosed, toggle] = useToggle(initialClosed);
  const parentRef = useRef<HTMLDivElement>(null);
  const touchedRef = useRef<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const parenSizeRef = useRef<number>(0);

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

  useResizeObserver<HTMLDivElement>({
    onResize: ({ width, height }) => {
      const size = orientation === 'horizontal' ? width : height;
      if (size && minimumSize && !touchedRef.current) {
        if (size <= minimumSize && !isFinalClosed) {
          const parentBounding = parentRef.current?.getBoundingClientRect();
          if (parentBounding) {
            parenSizeRef.current =
              orientation === 'horizontal'
                ? parentBounding.width
                : parentBounding.height;
          }
          toggle();
        } else if (size > parenSizeRef.current && isFinalClosed) {
          toggle();
        }
      }
    },
    ref: panelRef,
  });

  const toggleHandler = useCallback(() => {
    touchedRef.current = true;
    toggle();
  }, [toggle]);

  const mouseDownHandler = useCallback(
    (e) => {
      touchedRef.current = true;
      onMouseDown(e);
    },
    [onMouseDown],
  );

  const getSplitInnerProps = (side: SideSeparation) => {
    return {
      style: cssStyles.item(
        isFinalClosed,
        sideSeparation === side,
        orientation,
        size,
        type,
      ),
      value: isFinalClosed && sideSeparation === side,
      ...(sideSeparation !== side && { innerRef: panelRef }),
    };
  };

  return (
    <div
      ref={parentRef}
      onMouseUp={onMouseUp}
      css={css([
        { display: 'flex', height: '100%', width: '100%' },
        orientation === 'vertical' && { flexDirection: 'column' },
      ])}
    >
      <SplitPaneInner {...getSplitInnerProps('start')}>
        {children[0]}
      </SplitPaneInner>

      <Splitter
        onDoubleClick={toggleHandler}
        onMouseDown={mouseDownHandler}
        onMouseUp={onMouseUp}
        isFinalClosed={isFinalClosed}
        orientation={orientation}
      />

      <SplitPaneInner {...getSplitInnerProps('end')}>
        {children[1]}
      </SplitPaneInner>
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

interface SplitterProps {
  onDoubleClick: () => void;
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseUp: () => void;
  orientation: SplitOrientation;
  isFinalClosed: boolean;
}

function Splitter(props: SplitterProps) {
  const { onDoubleClick, onMouseDown, onMouseUp, orientation, isFinalClosed } =
    props;
  return (
    <div
      onDoubleClick={onDoubleClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      css={cssStyles.separator(orientation, !isFinalClosed)}
    >
      <div css={css({ fontSize: 10 })}>
        {orientation === 'horizontal' ? <span>⋮</span> : <span>⋯</span>}
      </div>
    </div>
  );
}

interface SplitPaneInnerProps {
  style: CSSProperties;
  value: boolean;
  children: React.ReactNode;
  innerRef?: RefObject<HTMLDivElement>;
}

function SplitPaneInner(props: SplitPaneInnerProps) {
  const { style, value, children, innerRef } = props;

  return (
    <splitPaneContext.Provider value={value}>
      <div ref={innerRef} style={style}>
        {children}
      </div>
    </splitPaneContext.Provider>
  );
}
