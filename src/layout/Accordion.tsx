/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode, ReactFragment } from 'react';

import { useAccordionContext } from './context/AccordionContext';
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
    fontSize: '11px',
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
  const { item, utils } = useAccordionContext(props.title, props.defaultOpened);

  const onClickHandle = useDoubleClick({
    onClick: utils.toggle,
    onDoubleClick: utils.clear,
  });

  let displayable = false;

  if (item) {
    displayable = item.isOpen;
  }

  return (
    <div
      style={{
        flex: displayable ? '1 1 1px' : 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <button
        onClick={onClickHandle}
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
        css={styles.header}
      >
        {props.title}
      </button>
      <div
        style={{
          display: displayable ? 'flex' : 'none',
          flex: displayable ? '1 1 1px' : 'none',
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
          {props.children}
        </div>
      </div>
    </div>
  );
};
