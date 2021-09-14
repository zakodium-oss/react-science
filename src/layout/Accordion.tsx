/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactNode, useState } from 'react';

interface AccordionProps {
  children:
    | Array<React.ReactElement<AccordionItemProps>>
    | React.ReactElement<AccordionItemProps>;
}

interface AccordionItemProps {
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
  return <div css={styles.container}>{props.children}</div>;
}

Accordion.Item = function AccordionItem(props: AccordionItemProps) {
  const { children, title, defaultOpened = false } = props;
  const [open, setOpen] = useState(defaultOpened);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div css={styles.item(open)}>
      <div onClick={handleClick} css={styles.header}>
        {title}
      </div>
      <div style={{ display: open ? 'block' : 'none' }}>{children}</div>
    </div>
  );
};
