import { Colors } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  RefObject,
} from 'react';
import { useEffect, useReducer, useRef } from 'react';
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
   * Defines which side of the pane is controlled by the size value.
   * It is also the side that can be closed.
   * 'start' means 'left' if the direction is `horizontal` and 'top' if the
   * direction is `vertical`.
   * @default 'start'
   */
  controlledSide?: SplitPaneSide;

  /**
   * Initial size of the controlled side.
   * This prop has no effect if the `size` prop is used.
   * Unit can be either '%' or 'px'.
   * @default '50%'
   */
  defaultSize?: SplitPaneSize;

  /**
   * Defines whether the pane is initially open.
   * This prop has no effect if the `open` prop is used.
   * A value of `true` means the pane is initially open.
   * A value of `false` means the pane is initially closed.
   * @default true
   */
  defaultOpen?: boolean;

  /**
   * Controls the open state of the pane.
   */
  open?: boolean;

  /**
   * Called whenever the open state of the pane changes.
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * If specified, closes / opens the pane automatically once the available space
   * for the SplitPane along the axis defined by the `direction` prop becomes
   * smaller / larger (respectively) than this value. The value is in pixels.
   * After the user manually opens or closes the splitter, the pane will
   * no longer open or close automatically.
   */
  closeThreshold?: number;

  /**
   * Called whenever the user finishes resizing the pane.
   */
  onResize?: (position: SplitPaneSize) => void;

  /**
   * Controls the size of the controlled side.
   */
  size?: SplitPaneSize;

  /**
   * Called whenever the size of the controlled side changes.
   */
  onSizeChange?: (size: SplitPaneSize) => void;

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
    open: openProp,
    size: sizeProp,
    onSizeChange,
    closeThreshold = null,
    onResize,
    onOpenChange,
    children,
  } = props;

  const [isOpen, setIsOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const [size, setSize] = useControllableState<SplitPaneSize>({
    prop: sizeProp,
    defaultProp: defaultSize,
    onChange: onSizeChange,
  });

  const [splitSize, sizeType] = parseSize(size ?? defaultSize);

  // Whether the user has already interacted with the pane.
  const [hasTouched, touch] = useReducer(() => true, false);

  const splitterRef = useRef<HTMLDivElement>(null);
  const { onPointerDown } = useSplitPaneSize({
    controlledSide,
    direction,
    splitterRef,
    sizeType,
    onSizeChange(value) {
      touch();
      const serialized = serializeSize(value);
      setSize(serialized);
    },
    onResize,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Module exists.
  const rootSize = useResizeObserver<HTMLDivElement>();
  const mainDirectionSize =
    direction === 'horizontal' ? rootSize.width : rootSize.height;

  useEffect(() => {
    if (
      closeThreshold === null ||
      hasTouched ||
      mainDirectionSize === undefined
    ) {
      return;
    }
    const shouldBeOpen = mainDirectionSize >= closeThreshold;
    setIsOpen(shouldBeOpen);
  }, [mainDirectionSize, closeThreshold, hasTouched, setIsOpen, isOpen]);

  function handleToggle() {
    touch();
    setIsOpen(!isOpen);
  }

  function getSplitSideStyle(side: SplitPaneSide) {
    return getItemStyle(
      isOpen ?? defaultOpen,
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
        isOpen={isOpen ?? defaultOpen}
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
      <SplitContent>{direction === 'horizontal' ? '⋮' : '⋯'}</SplitContent>
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

type ParsedSplitPaneSize = [number, SplitPaneType];

function parseSize(size: string): ParsedSplitPaneSize {
  const value = Number.parseFloat(size);
  // remove numbers and dots from the string
  const type = size.replaceAll(/[\d .]/g, '') as SplitPaneType;

  return [value, type];
}

function serializeSize(size: [number, SplitPaneType]): SplitPaneSize {
  return `${size[0]}${size[1]}`;
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

const SplitContent = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  font-size: 0.875em;
  max-height: 100%;
`;
