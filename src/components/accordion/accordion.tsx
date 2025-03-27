import { Colors } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import type {
  MouseEvent as ReactMouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import { useCallback, useRef } from 'react';

import { useAccordionItemContext } from './accordion_context.js';
import type { AccordionItemControls } from './accordion_context_utils.js';

export interface AccordionProps<T extends string = string> {
  children?:
    | Array<ReactElement<AccordionItemProps<T>>>
    | ReactElement<AccordionItemProps<T>>
    | boolean
    | null;
}

export interface AccordionRenderToolbarProps<T extends string = string> {
  id: T;
  isOpen: boolean;
  controls: AccordionItemControls;
}

export interface AccordionItemProps<T extends string = string> {
  /**
   * A value uniquely identifying the accordion item.
   */
  id: T;
  /**
   * The title of the accordion item.
   */
  title: string;
  children: ReactNode;
  /**
   * Defines whether the accordion item is initially open.
   * This prop has no effect if the `open` prop is used.
   * A value of `true` means the accordion item is initially open.
   * A value of `false` means the accordion item is initially closed.
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Controls the open state of the accordion item.
   */
  open?: boolean;
  /**
   * Called whenever the open state of the pane changes.
   */
  onOpenChange?: (isOpen: boolean) => void;
  /**
   * When set to true, the item's children will not be rendered if the item is closed.
   * When not set or set to false, the item's children will be rendered but hidden when the item is closed.
   */
  unmountChildren?: boolean;
  /**
   * A custom render function to display in the toolbar on the right of the accordion item.
   * Click events will not be propagated down to the accordion item to prevent it from opening/closing.
   * @param data
   */
  renderToolbar?: (renderProps: AccordionRenderToolbarProps<T>) => ReactNode;
}

const AccordionItemHeader = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-color: #d5d5d5 currentcolor currentcolor;
  border-style: solid none none;
  color: #2d2d2d;
  font-weight: bold;
  text-decoration: none;
  text-shadow: white 0 1px 0;
  background: white
    linear-gradient(${Colors.LIGHT_GRAY5} 5%, ${Colors.LIGHT_GRAY3} 100%) repeat
    scroll 0 0;
  width: 100%;
  user-select: none;
  justify-content: space-between;
  padding-left: 12px;

  &:hover {
    background: white
      linear-gradient(${Colors.LIGHT_GRAY4} 5%, ${Colors.LIGHT_GRAY2} 100%)
      repeat scroll 0 0;
  }
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export function Accordion<T extends string = string>(props: AccordionProps<T>) {
  return <AccordionContainer>{props.children}</AccordionContainer>;
}

Accordion.Item = function AccordionItem<T extends string = string>(
  props: AccordionItemProps<T>,
) {
  const {
    id,
    title,
    children,
    defaultOpen = false,
    open,
    renderToolbar,
    onOpenChange,
  } = props;

  const [isOpen, setIsOpen] = useControllableState({
    prop: open,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const { controls, unmountChildren } = useAccordionItemContext(id, setIsOpen);

  const headerRef = useRef<HTMLDivElement>(null);

  const shouldUnmountChildren =
    props.unmountChildren === undefined
      ? unmountChildren
      : props.unmountChildren;

  const onClickHandle = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (event.shiftKey) {
        controls.closeOthers();
      } else {
        controls.toggle();
      }
    },
    [controls],
  );

  return (
    <div
      style={{
        flex: isOpen ? '1 1 1px' : 'none',
        display: 'flex',
        flexDirection: 'column',
        isolation: 'isolate',
      }}
    >
      <AccordionItemHeader
        onClick={onClickHandle}
        role="button"
        ref={headerRef}
      >
        <div
          style={{
            padding: '5px 0px',
          }}
        >
          {title}
        </div>
        <ToolbarContainer onClick={(event) => event.stopPropagation()}>
          {renderToolbar?.({ id, isOpen: isOpen ?? false, controls })}
        </ToolbarContainer>
      </AccordionItemHeader>
      {!isOpen && shouldUnmountChildren ? null : (
        <div
          style={{
            display: isOpen ? 'flex' : 'none',
            flex: isOpen ? '1 1 1px' : 'none',
            backgroundColor: 'white',
            maxHeight: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: '100%',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const ToolbarContainer = styled.div`
  display: flex;
`;
