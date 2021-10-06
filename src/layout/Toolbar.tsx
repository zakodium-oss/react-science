/** @jsxImportSource @emotion/react */
import { css, CSSObject } from '@emotion/react';
import React, {
  Children,
  cloneElement,
  ReactFragment,
  ReactNode,
  forwardRef,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
  ReactElement,
} from 'react';

import { ToolbarProvider, useToolbarContext } from './context/ToolbarContext';
import { ElementBounding, useCheckOverflow } from './hooks/useCheckOverflow';
import { useToggle } from './hooks/useToggle';

export type ToolbarOverflow = 'unset' | 'hidden' | 'popup';
export type ToolbarOrientation = 'vertical' | 'horizontal';
export type ToolbarItemOrientation = 'vertical' | 'horizontal' | 'auto';

export interface ToolbarProps {
  orientation: ToolbarOrientation;
  overflow?: ToolbarOverflow;
  children?:
    | Array<React.ReactElement<ToolbarItemProps>>
    | React.ReactElement<ToolbarItemProps>
    | ReactFragment
    | boolean
    | null;
}

export interface ToolbarItemProps {
  id: string;
  title: string;
  children: ReactNode;

  active?: boolean;
  titleOrientation?: ToolbarItemOrientation;
  onClick?: (item: ToolbarItemProps) => void;
  className?: string;
}

const border = '1px solid rgb(247, 247, 247)';

const styles = {
  toolbar: (orientation: ToolbarOrientation, overflow: ToolbarOverflow) => {
    return css([
      { display: 'flex', overflow: overflow !== 'popup' ? overflow : 'unset' },
      orientation === 'vertical'
        ? {
            flexDirection: 'column',
            minHeight: '100%',
            borderRight: border,
          }
        : {
            flexDirection: 'row',
            minWidth: '100%',
          },
      {},
    ]);
  },
  item: (active: boolean) => {
    return css([
      active && { backgroundColor: 'rgb(247, 247, 247)', borderRadius: 5 },
      {
        width: 30,
        height: 30,
        outline: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        '&:hover + .content': { display: 'flex' },
      },
    ]);
  },
  tooltip: (
    orientation: ToolbarOrientation,
    itemOrientation: ToolbarItemOrientation,
  ) => {
    const common: CSSObject = {
      display: 'none',
      position: 'absolute',
      backgroundColor: 'gray',
      borderRadius: '2px',
      color: 'white',
      bottom: '0px',
      right: '0px',
      width: 'fit-content',
      height: '50%',
      fontSize: '10px',
      whiteSpace: 'nowrap',
      paddingLeft: '3px',
      paddingRight: '3px',
      zIndex: 50,
    };

    if (itemOrientation === 'auto') {
      return css([
        common,
        orientation === 'vertical' && { margin: 'auto', marginLeft: 5 },
        orientation === 'horizontal'
          ? { top: '100%' }
          : { top: '0px', left: '100%' },
      ]);
    } else {
      return css([
        common,
        itemOrientation === 'horizontal' && { margin: 'auto', marginLeft: 5 },
        itemOrientation === 'vertical'
          ? { top: '100%' }
          : { top: '0px', left: '100%' },
      ]);
    }
  },
  moreItems: (
    orientation: ToolbarOrientation,
    parentWrapperBounding: ElementBounding,
    itemsCount: number,
    childrenCount: number,
  ) => {
    const common: CSSObject = {
      position: 'absolute',
      backgroundColor: 'white',
      display: 'flex',
      flexWrap: 'wrap',
      boxShadow: ' 2px 0px 3px 0px rgba(0,0,0,0.2)',
    };
    if (orientation === 'vertical') {
      const width =
        Math.ceil(childrenCount / (itemsCount + 1)) *
        parentWrapperBounding.width;
      return css([
        common,
        {
          flexDirection: 'column',
          left: parentWrapperBounding.width,
          top: 0,
          height: parentWrapperBounding.height,
          boxShadow: '  3px 0px 3px -2px rgb(0 0 0 / 20%)',
          width,
        },
      ]);
    }

    if (orientation === 'horizontal') {
      return css([
        common,
        {
          flexDirection: 'row',
          top: parentWrapperBounding.height,
          left: 0,
          width: parentWrapperBounding.width,
          boxShadow: ' 0px 3px 3px 0px rgb(0 0 0 / 20%)',
        },
      ]);
    }
  },
};

export function Toolbar(props: ToolbarProps) {
  const { children, orientation, overflow = 'unset' } = props;
  const { ref, elementBounding: containerBounding } =
    useCheckOverflow<HTMLDivElement>(orientation);
  const items = useElements(
    children as React.ReactElement[],
    containerBounding,
    orientation,
    overflow,
  );
  return (
    <div ref={ref} css={styles.toolbar(orientation, overflow)}>
      <ToolbarProvider orientation={orientation}>
        {items}
        {overflow === 'popup' && Children.count(children) > items.length && (
          <MoreElements
            parentWrapperBounding={containerBounding}
            itemsCount={items.length}
          >
            {Children.toArray(children).slice(items.length)}
          </MoreElements>
        )}
      </ToolbarProvider>
    </div>
  );
}
Toolbar.Item = forwardRef<HTMLDivElement, ToolbarItemProps>(
  function ToolbarItem(props, ref) {
    const orientation = useToolbarContext();
    const {
      active = false,
      children,
      onClick,
      title,
      titleOrientation = 'auto',
      id,
      ...other
    } = props;

    return (
      <div ref={ref} style={{ position: 'relative', margin: 4 }} {...other}>
        <button
          type="button"
          css={styles.item(active)}
          onClick={() => {
            if (onClick) {
              onClick(props);
            }
          }}
        >
          {children}
        </button>
        <div
          className="content"
          css={styles.tooltip(orientation, titleOrientation)}
        >
          <span
            style={{
              display: 'flex',
              margin: 'auto',
              justifyContent: 'center',
            }}
          >
            {title}
          </span>
        </div>
      </div>
    );
  },
);

interface MoreElementsProps {
  children?:
    | Array<React.ReactElement<ToolbarItemProps>>
    | React.ReactElement<ToolbarItemProps>
    | ReactFragment
    | boolean
    | null;
  parentWrapperBounding: ElementBounding;
  itemsCount: number;
}

function MoreElements({
  children,
  parentWrapperBounding,
  itemsCount,
}: MoreElementsProps) {
  const [isClick, toggle] = useToggle();
  const orientation = useToolbarContext();

  return (
    <div>
      <Toolbar.Item
        id="more"
        title={isClick ? 'close' : 'open more'}
        onClick={toggle}
      >
        {isClick && (
          <span style={{ color: 'red', fontSize: '14px' }}>&#10005;</span>
        )}
        {!isClick && orientation === 'vertical' && <span>&#8942;</span>}
        {!isClick && orientation === 'horizontal' && <span>&#8943;</span>}
      </Toolbar.Item>
      {isClick && (
        <div
          css={styles.moreItems(
            orientation,
            parentWrapperBounding,
            itemsCount,
            Children.count(children),
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function useElements(
  children: Array<React.ReactElement>,
  elementBounding: ElementBounding,
  orientation: ToolbarItemOrientation,
  overflow: ToolbarOverflow,
) {
  const childrenRefs = useRef<HTMLDivElement[]>([]);
  const [items, setItems] = useState<ReactElement[]>([]);
  const elements = useMemo(() => {
    return Children.map(children, (child, index) => {
      return cloneElement(child, {
        ref: (element: HTMLDivElement) =>
          (childrenRefs.current[index] = element),
      });
    });
  }, [children]);

  useLayoutEffect(() => {
    if (childrenRefs.current[0]) {
      const numberOfElements = getNumberOfElements(
        orientation,
        elementBounding,
        childrenRefs.current[0],
      );
      setItems(elements?.slice(0, numberOfElements - 1));
    } else {
      setItems(elements);
    }
  }, [
    elementBounding,
    elementBounding.height,
    elementBounding.width,
    elements,
    orientation,
  ]);

  if (overflow !== 'popup') {
    return children;
  }

  return items;
}

function getNumberOfElements(
  orientation: ToolbarItemOrientation,
  containerElement: ElementBounding,
  element: HTMLDivElement,
) {
  if (orientation === 'vertical') {
    const {
      clientHeight,
      style: { marginTop, marginBottom },
    } = element;
    const totalHeight =
      clientHeight + parseInt(marginTop, 10) + parseInt(marginBottom, 10);
    return Math.floor(containerElement.height / totalHeight);
  } else {
    const {
      clientWidth,
      style: { marginLeft, marginRight },
    } = element;
    const totalWidth =
      clientWidth + parseInt(marginLeft, 10) + parseInt(marginRight, 10);
    return Math.floor(containerElement.width / totalWidth);
  }
}
