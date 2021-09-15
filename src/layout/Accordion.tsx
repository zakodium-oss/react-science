/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode, ReactFragment, ReactElement } from 'react';

import {
  AccordionProvider,
  useAccordionContext,
} from './context/AccordionContext';
import { useDoubleClick } from './hooks/useDoubleClick';

interface AccordionProps {
  children?:
    | Array<React.ReactElement<AccordionItemProps>>
    | React.ReactElement<AccordionItemProps>
    | ReactFragment
    | boolean
    | null;
}

export interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpened?: boolean;
}

const styles = {
  container: css({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }),
  item: (isOpen: boolean) => {
    return css([
      {
        display: 'flex',
        flexDirection: 'column',
        transition: 'flex-grow 500ms',
      },
      isOpen && { flex: '1 1 0%' },
    ]);
  },
  header: css({
    cursor: 'pointer',
    padding: '5px 12px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '11px',
    borderColor: 'rgb(213, 213, 213) currentcolor currentcolor',
    borderStyle: 'solid none none',
    borderWidth: '0.55px, medium medium',
    borderImage: 'none 100% / 1 / 0 stretch',
    color: 'rgb(45, 45, 45)',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    textDecoration: 'none',
    textShadow: 'rgb(255, 255, 255) 0px 1px 0px',
    background:
      'rgb(255, 255, 255) linear-gradient(rgb(240, 240, 240) 5%, rgb(225, 225, 225) 100%) repeat scroll 0% 0%',
  }),
};

export function Accordion(props: AccordionProps) {
  const items =
    React.Children.map(props.children, (child) => {
      if (!child) {
        return undefined;
      }

      const { props } = child as ReactElement<AccordionItemProps>;

      return {
        title: props.title,
        isOpen: props.defaultOpened || false,
      };
    }) || [];

  return (
    <AccordionProvider items={items.filter((element) => element !== undefined)}>
      <div css={styles.container}>{props.children}</div>
    </AccordionProvider>
  );
}

Accordion.Item = function AccordionItem(props: AccordionItemProps) {
  const {
    item,
    utils: { clear, toggle },
  } = useAccordionContext(props.title);

  const onClickHandle = useDoubleClick({
    onClick: toggle,
    onDoubleClick: clear,
  });

  return (
    <div css={styles.item(item.isOpen)}>
      <div onClick={onClickHandle} css={styles.header}>
        {item.title}
      </div>
      <div style={{ display: item.isOpen ? 'block' : 'none' }}>
        {props.children}
      </div>
    </div>
  );
};
