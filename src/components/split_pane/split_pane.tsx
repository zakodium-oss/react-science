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
import { useResizeObserver } from 'react-d3-utils';
import { match } from 'ts-pattern';

import type { SplitPaneSize, SplitPaneType } from './split_pane_helpers.js';
import { parseSize, serializeSize } from './split_pane_helpers.js';
import { useSplitPaneSize } from './use_split_pane_size.js';

export type SplitPaneDirection = 'vertical' | 'horizontal';
export type SplitPaneSide = 'start' | 'end';

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
   * After the user interacts with the splitter, the pane will no longer open
   * or close automatically.
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
   * If one of the elements is `null`, the splitter will disappear and the
   * other element will take the full space.
   * If both elements are `null`, only a container will be rendered.
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

  const { type: sizeType, value: splitSize } = parseSize(size ?? defaultSize);

  // Whether the user has already interacted with the pane.
  const [hasTouched, touch] = useReducer(() => true, false);

  const splitterRef = useRef<HTMLDivElement>(null);
  const { onPointerDown, isResizing } = useSplitPaneSize({
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

  const [rootRef, rootSize] = useResizeObserver();
  const mainDirectionSize =
    direction === 'horizontal' ? rootSize?.width : rootSize?.height;

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
    <SplitPaneContainer direction={direction} ref={rootRef}>
      {children[0] !== null && (
        <SplitSide style={getSplitSideStyle('start')}>{children[0]}</SplitSide>
      )}
      {children[0] !== null && children[1] !== null && (
        <Splitter
          onDoubleClick={handleToggle}
          onPointerDown={isOpen ? onPointerDown : undefined}
          isOpen={isOpen ?? defaultOpen}
          isResizing={isResizing}
          direction={direction}
          splitterRef={splitterRef}
        />
      )}

      {children[1] !== null && (
        <SplitSide style={getSplitSideStyle('end')}>{children[1]}</SplitSide>
      )}
    </SplitPaneContainer>
  );
}

interface SplitterProps {
  onDoubleClick: () => void;
  onPointerDown?: (event: ReactPointerEvent) => void;
  direction: SplitPaneDirection;
  isOpen: boolean;
  isResizing: boolean;
  splitterRef: RefObject<HTMLDivElement | null>;
}

function Splitter(props: SplitterProps) {
  const {
    onDoubleClick,
    onPointerDown,
    direction,
    isOpen,
    isResizing,
    splitterRef,
  } = props;

  return (
    <Split
      onDoubleClick={onDoubleClick}
      onPointerDown={onPointerDown}
      enabled={isOpen}
      direction={direction}
      isResizing={isResizing}
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
): CSSProperties {
  const isHorizontal = direction === 'horizontal';
  const base: CSSProperties = { display: 'flex', overflow: 'hidden' };
  if (!isOpen) {
    return isControlledSide ? { display: 'none' } : { flex: '1 1 0%', ...base };
  } else if (type === '%' && size !== 0) {
    return isControlledSide
      ? {
          ...base,
          flex: '100 0 0%',
        }
      : {
          ...base,
          flex: `${percentToFlex(size)} 0 0%`,
          [isHorizontal ? 'minWidth' : 'minHeight']: 0,
        };
  } else {
    return isControlledSide
      ? {
          ...base,
          [isHorizontal ? 'width' : 'height']: size,
        }
      : {
          ...base,
          flex: '1 1 0%',
          [isHorizontal ? 'minWidth' : 'minHeight']: 0,
        };
  }
}

const Split = styled.div<{
  direction: SplitPaneDirection;
  enabled: boolean;
  isResizing: boolean;
}>`
  background-color: ${(props) =>
    props.isResizing ? Colors.LIGHT_GRAY3 : Colors.LIGHT_GRAY5};
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  min-width: 11px;
  touch-action: none;

  :hover {
    background-color: ${(props) =>
      props.isResizing ? Colors.LIGHT_GRAY3 : Colors.LIGHT_GRAY4};
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

const SplitPaneContainer = styled.div<{ direction: SplitPaneDirection }>`
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  ${(props) =>
    props.direction === 'horizontal' ? 'min-width: 0;' : 'min-height: 0;'}
  flex-direction: ${(props) =>
    props.direction === 'horizontal' ? 'row' : 'column'};
`;

const SplitContent = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  font-size: 0.875em;
  max-height: 100%;
`;
