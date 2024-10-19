/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
  toolbar?: ReactNode;
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  }),
  item: (isOpen: boolean) => {
    return css([
      {
        display: 'flex',
        flexDirection: 'column',
      },
      isOpen && { flex: '1 1 0%' },
    ]);
  },
  header: css({
    cursor: 'pointer',
    padding: '5px 12px',
    display: 'flex',
    alignItems: 'center',
    borderColor: 'rgb(213, 213, 213) currentcolor currentcolor',
    borderStyle: 'solid none none',
    color: 'rgb(45, 45, 45)',
    fontWeight: 'bold',
    textDecoration: 'none',
    textShadow: 'rgb(255, 255, 255) 0px 1px 0px',
    background:
      'rgb(255, 255, 255) linear-gradient(rgb(240, 240, 240) 5%, rgb(225, 225, 225) 100%) repeat scroll 0% 0%',
  }),
};

export function Accordion(props: AccordionProps) {
  return <div css={styles.container}>{props.children}</div>;
}

Accordion.Item = function AccordionItem(props: AccordionItemProps) {
  const { title, children, defaultOpened, toolbar } = props;
  const { item, utils } = useAccordionContext(title, defaultOpened);

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
      }}
    >
      <div
        onClick={onClickHandle}
        role="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          userSelect: 'none',
          justifyContent: 'space-between',
          padding: '0px 12px',
        }}
        css={styles.header}
      >
        <div
          style={{
            padding: '5px 0px',
          }}
        >
          {title}
        </div>
        {toolbar}
      </div>
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
    </div>
  );
};
