/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import type {
  MouseEvent as ReactMouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import { useCallback } from 'react';

import { useAccordionContext } from './accordion_context.js';

export interface AccordionProps {
  children?:
    | Array<ReactElement<AccordionItemProps>>
    | ReactElement<AccordionItemProps>
    | boolean
    | null;
}

export interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpened?: boolean;
  /**
   * When set to true, the item's children will not be rendered if the item is closed.
   * When not set or set to false, the item's children will be rendered but hidden when the item is closed.
   */
  unmountChildren?: boolean;
  toolbar?: ReactNode;
}

const AccordionItemHeader = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-color: rgb(213, 213, 213) currentcolor currentcolor;
  border-style: solid none none;
  color: rgb(45, 45, 45);
  font-weight: bold;
  text-decoration: none;
  text-shadow: rgb(255, 255, 255) 0 1px 0;
  background: rgb(255, 255, 255)
    linear-gradient(rgb(240, 240, 240) 5%, rgb(225, 225, 225) 100%) repeat
    scroll 0 0;

  width: 100%;
  user-select: none;
  justify-content: space-between;
  padding: 0 12px;
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export function Accordion(props: AccordionProps) {
  return <AccordionContainer>{props.children}</AccordionContainer>;
}

Accordion.Item = function AccordionItem(props: AccordionItemProps) {
  const { title, children, defaultOpened, toolbar } = props;
  const { item, utils, unmountChildren } = useAccordionContext(
    title,
    defaultOpened,
  );

  const shouldUnmountChildren =
    props.unmountChildren === undefined
      ? unmountChildren
      : props.unmountChildren;

  const onClickHandle = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (event.shiftKey) {
        utils.clear();
      } else {
        utils.toggle();
      }
    },
    [utils],
  );

  return (
    <div
      style={{
        flex: item?.isOpen ? '1 1 1px' : 'none',
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
        {toolbar}
      </AccordionItemHeader>
      {!item?.isOpen && shouldUnmountChildren ? null : (
        <div
          style={{
            display: item?.isOpen ? 'flex' : 'none',
            flex: item?.isOpen ? '1 1 1px' : 'none',
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
