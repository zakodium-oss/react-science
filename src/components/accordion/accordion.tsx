import { Colors } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import type {
  MouseEvent as ReactMouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import { useCallback } from 'react';

import { useAccordionContext } from './accordion_context.js';

export interface AccordionProps<T extends string = string> {
  children?:
    | Array<ReactElement<AccordionItemProps<T>>>
    | ReactElement<AccordionItemProps<T>>
    | boolean
    | null;
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
  renderToolbar?: (isOpen: boolean) => ReactNode;
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
    background: linear-gradient(
        ${Colors.LIGHT_GRAY2} 0%,
        ${Colors.LIGHT_GRAY4} 100%
      )
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
  const { utils, unmountChildren } = useAccordionContext(id, setIsOpen);

  const shouldUnmountChildren =
    props.unmountChildren === undefined
      ? unmountChildren
      : props.unmountChildren;

  const onClickHandle = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (event.shiftKey) {
        utils.closeOthers();
      } else {
        utils.toggle();
      }
    },
    [utils],
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
      <AccordionItemHeader onClick={onClickHandle} role="button">
        <div
          style={{
            padding: '5px 0px',
          }}
        >
          {title}
        </div>
        {renderToolbar?.(isOpen ?? false)}
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
