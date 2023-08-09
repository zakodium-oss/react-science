/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import {
  MouseEvent as ReactMouseEvent,
  createContext,
  CSSProperties,
  ReactNode,
  useContext,
  useRef,
  useState,
  RefObject,
  useReducer,
  useEffect,
} from 'react';
import useResizeObserver from 'use-resize-observer';

import { useOnOff } from '../hooks/useOnOff';

import { useSplitPaneSize } from './useSplitPaneSize';

export type SplitPaneDirection = 'vertical' | 'horizontal';
export type SplitPaneSide = 'start' | 'end';
export type SplitPaneSize = `${number}%` | `${number}px`;
export type SplitPaneType = '%' | 'px';

export interface SplitPaneProps {
  /**
   * Whether the split is done in the horizontal or vertical direction.
   * @default 'horizontal'
   */
  direction?: SplitPaneDirection;
  /**
   * Defines which side of the pane is controlled by the split value.
   * It is also the side that will be closed when the user double clicks on the
   * splitter.
   * A value of 'start' means 'left' or 'top' (depending on the direction).
   * @default 'start'
   */
  controlledSide?: SplitPaneSide;
  /**
   * size of the controlled side. Unit can be either '%' or 'px'.
   * @default '50%'
   */
  size?: SplitPaneSize;
  /**
   * Defines whether the pane is initially closed.
   * A value of `true` means the pane is always initially closed.
   * A value of `false` means the pane is always initially open.
   * A value of type `number` means the pane is initially closed if its total
   * size is smaller than the specified value. In that case, the pane will
   * dynamically open or close when the total size changes, until the user
   * interacts with the splitter. After the first interaction, the pane will
   * no longer open or close automatically.
   * @default false
   */
  closed?: boolean | number;
  /**
   * Called whenever the user finishes resizing the pane.
   */
  onResize?: (position: SplitPaneSize) => void;
  /**
   * Called whenever the user double clicks on the splitter to open or close
   * the pane.
   */
  onToggle?: (isClosed: boolean) => void;
  /**
   * The two React elements to show on both sides of the pane.
   */
  children: [ReactNode, ReactNode];
}

const splitPaneContext = createContext<boolean>(false);

export function useSplitPaneContext() {
  return useContext(splitPaneContext);
}

export function SplitPane(props: SplitPaneProps) {
  const {
    direction = 'horizontal',
    controlledSide = 'start',
    size = '50%',
    closed = false,
    onResize,
    onToggle,
    children,
  } = props;

  const minimumSize = typeof closed === 'number' ? closed : null;

  // Whether the pane is explicitly closed. If the value is `false`, the pane
  // may still be currently closed because it is smaller than the minimum size.
  const [isPaneClosed, closePane, openPane] = useOnOff(
    typeof closed === 'boolean' ? closed : false,
  );

  // Whether the user has already interacted with the pane.
  const [hasTouched, touch] = useReducer(() => true, false);

  const [[splitSize, sizeType], setSize] = useState(() => parseSize(size));

  useEffect(() => {
    setSize(parseSize(size));
  }, [size]);

  useEffect(() => {
    if (typeof closed === 'boolean') {
      if (closed) {
        closePane();
      } else {
        openPane();
      }
    }
  }, [closePane, closed, openPane]);

  const splitterRef = useRef<HTMLDivElement>(null);
  const { onMouseDown } = useSplitPaneSize({
    controlledSide,
    direction,
    splitterRef,
    sizeType,
    onSizeChange(value) {
      touch();
      setSize(value);
    },
    onResize,
  });

  const rootSize = useResizeObserver<HTMLDivElement>();

  let isFinalClosed = isPaneClosed;
  if (
    !isFinalClosed &&
    minimumSize !== null &&
    !hasTouched &&
    rootSize.width !== undefined &&
    rootSize.height !== undefined
  ) {
    if (direction === 'horizontal') {
      isFinalClosed = rootSize.width < minimumSize;
    } else {
      isFinalClosed = rootSize.height < minimumSize;
    }
  }

  function handleToggle() {
    touch();
    if (isFinalClosed) {
      openPane();
      if (isPaneClosed && onToggle) {
        onToggle(false);
      }
    } else {
      closePane();
      if (!isPaneClosed && onToggle) {
        onToggle(true);
      }
    }
  }

  function getSplitSideStyle(side: SplitPaneSide) {
    return getItemStyle(
      isFinalClosed,
      controlledSide === side,
      direction,
      splitSize,
      sizeType,
    );
  }

  return (
    <div
      ref={rootSize.ref}
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        [direction === 'horizontal' ? 'minWidth' : 'minHeight']: 0,
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
      }}
    >
      <SplitSide style={getSplitSideStyle('start')}>{children[0]}</SplitSide>

      <Splitter
        onDoubleClick={handleToggle}
        onMouseDown={isFinalClosed ? undefined : onMouseDown}
        isFinalClosed={isFinalClosed}
        direction={direction}
        splitterRef={splitterRef}
      />

      <SplitSide style={getSplitSideStyle('end')}>{children[1]}</SplitSide>
    </div>
  );
}

interface SplitterProps {
  onDoubleClick: () => void;
  onMouseDown?: (event: ReactMouseEvent) => void;
  direction: SplitPaneDirection;
  isFinalClosed: boolean;
  splitterRef: RefObject<HTMLDivElement>;
}

function Splitter(props: SplitterProps) {
  const { onDoubleClick, onMouseDown, direction, isFinalClosed, splitterRef } =
    props;
  return (
    <div
      onDoubleClick={onDoubleClick}
      onMouseDown={onMouseDown}
      css={getSeparatorStyle(direction, !isFinalClosed)}
      ref={splitterRef}
    >
      <div style={{ fontSize: '0.875em' }}>
        {direction === 'horizontal' ? <span>⋮</span> : <span>⋯</span>}
      </div>
    </div>
  );
}

interface SplitSideProps {
  style: CSSProperties;
  children: ReactNode;
}

function SplitSide(props: SplitSideProps) {
  const { style, children } = props;

  return <div style={style}>{children}</div>;
}

function parseSize(size: string): [number, SplitPaneType] {
  const value = Number.parseFloat(size);
  // remove numbers and dots from the string
  const type = size.replaceAll(/[\d .]/g, '') as SplitPaneType;

  return [value, type];
}

const flexBase = 100;
function percentToFlex(percent: number): number {
  percent /= 100;
  return (flexBase - percent * flexBase) / percent;
}

function getItemStyle(
  isClosed: boolean,
  isControlledSide: boolean,
  direction: SplitPaneDirection,
  size: number,
  type: SplitPaneType,
) {
  const isHorizontal = direction === 'horizontal';
  if (isClosed) {
    return isControlledSide
      ? { display: 'none' }
      : { flex: '1 1 0%', display: 'flex' };
  } else if (type === '%') {
    return isControlledSide
      ? {
          flex: '100 0 0%',
          display: 'flex',
        }
      : {
          flex: `${percentToFlex(size)} 0 0%`,
          display: 'flex',
          [isHorizontal ? 'minWidth' : 'minHeight']: 0,
        };
  } else {
    return isControlledSide
      ? {
          [isHorizontal ? 'width' : 'height']: size,
          display: 'flex',
        }
      : {
          flex: '1 1 0%',
          display: 'flex',
          [isHorizontal ? 'minWidth' : 'minHeight']: 0,
        };
  }
}

function getSeparatorStyle(direction: SplitPaneDirection, enabled: boolean) {
  return css([
    direction === 'horizontal' && {
      cursor: enabled ? 'ew-resize' : 'pointer',
      width: '10px',
    },
    direction === 'vertical' && {
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
}
