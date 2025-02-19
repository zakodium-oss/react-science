import { Colors } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  RefObject,
} from 'react';
import { useEffect, useReducer, useRef, useState } from 'react';
import { match } from 'ts-pattern';
import useResizeObserver from 'use-resize-observer';

import { useSplitPaneSize } from './useSplitPaneSize.js';

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
   * Initial size of the controlled side.
   * Unit can be either '%' or 'px'.
   * @default '50%'
   */
  defaultSize?: SplitPaneSize;
  /**
   * Defines whether the pane is initially open.
   * A value of `true` means the pane is initially open.
   * A value of `false` means the pane is initially closed.
   * @default true
   */
  defaultOpen?: boolean;
  /**
   * If specified, opens / closes the pane automatically once the available space
   * for the SplitPane along the axis defined by the `direction` prop becomes
   * larger / smaller (respectively) than this value.
   * After the user manually opens or closes the splitter, the pane will
   * no longer open or close automatically.
   */
  minimumSize?: number;
  /**
   * Called whenever the user finishes resizing the pane.
   */
  onResize?: (position: SplitPaneSize) => void;
  /**
   * Called whenever the open state of the pane changes.
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * The two React elements to show on both sides of the pane.
   */
  children: [ReactNode, ReactNode];
}

export function SplitPane(props: SplitPaneProps) {
  const {
    direction = 'horizontal',
    controlledSide = 'start',
    defaultSize = '50%',
    defaultOpen = true,
    minimumSize = null,
    onResize,
    onOpenChange,
    children,
  } = props;
  // Whether the pane is explicitly closed. If the value is `false`, the pane
  // may still be currently closed because it is smaller than the minimum size.
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isOpenRef = useRef<boolean>(defaultOpen);

  // Whether the user has already interacted with the pane.
  const [hasTouched, touch] = useReducer(() => true, false);

  const [[splitSize, sizeType], setSize] = useState(() =>
    parseSize(defaultSize),
  );

  const splitterRef = useRef<HTMLDivElement>(null);
  const { onPointerDown } = useSplitPaneSize({
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

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // @ts-expect-error Module exists.
  const rootSize = useResizeObserver<HTMLDivElement>();

  const mainDirectionSize =
    direction === 'horizontal' ? rootSize.width : rootSize.height;

  useEffect(() => {
    if (minimumSize === null || hasTouched) {
      return;
    }
    const shouldBeOpen = mainDirectionSize >= minimumSize;
    setIsOpen(shouldBeOpen);
    if (shouldBeOpen !== isOpenRef.current) {
      onOpenChange?.(shouldBeOpen);
    }
  }, [mainDirectionSize, minimumSize, hasTouched, onOpenChange]);

  function handleToggle() {
    touch();
    setIsOpen(!isOpen);
    onOpenChange?.(!isOpen);
  }

  function getSplitSideStyle(side: SplitPaneSide) {
    return getItemStyle(
      isOpen,
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
        onPointerDown={isOpen ? onPointerDown : undefined}
        isOpen={isOpen}
        direction={direction}
        splitterRef={splitterRef}
      />

      <SplitSide style={getSplitSideStyle('end')}>{children[1]}</SplitSide>
    </div>
  );
}

interface SplitterProps {
  onDoubleClick: () => void;
  onPointerDown?: (event: ReactPointerEvent) => void;
  direction: SplitPaneDirection;
  isOpen: boolean;
  splitterRef: RefObject<HTMLDivElement>;
}

function Splitter(props: SplitterProps) {
  const { onDoubleClick, onPointerDown, direction, isOpen, splitterRef } =
    props;

  return (
    <Split
      onDoubleClick={onDoubleClick}
      onPointerDown={onPointerDown}
      enabled={isOpen}
      direction={direction}
      ref={splitterRef}
    >
      <div style={{ fontSize: '0.875em' }}>
        {direction === 'horizontal' ? <span>⋮</span> : <span>⋯</span>}
      </div>
    </Split>
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
  isOpen: boolean,
  isControlledSide: boolean,
  direction: SplitPaneDirection,
  size: number,
  type: SplitPaneType,
) {
  const isHorizontal = direction === 'horizontal';
  if (!isOpen) {
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

const Split = styled.div<{
  direction: SplitPaneDirection;
  enabled: boolean;
}>`
  background-color: ${Colors.LIGHT_GRAY5};
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  min-width: 11px;
  touch-action: none;

  :hover {
    background-color: ${Colors.LIGHT_GRAY3};
  }

  ${(props) =>
    match(props.direction)
      .with(
        'horizontal',
        () => `
        cursor: ${props.enabled ? 'ew-resize' : 'pointer'};
        width: 10px;
      `,
      )
      .with(
        'vertical',
        () => `
        height: 10px;
        cursor: ${props.enabled ? 'ns-resize' : 'pointer'};
      `,
      )
      .exhaustive()}
`;
