/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import React, { ReactNode, useState } from 'react';

interface AccordionLayoutProps {
  children:
    | Array<React.ReactElement<AccordionItemProps>>
    | React.ReactElement<AccordionItemProps>;
}

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpended?: boolean;
}

const styles: Record<
  'container' | 'item' | 'header',
  (object?: any) => SerializedStyles
> = {
  container: () => {
    return css`
      height: 100%;
      display: flex;
      flex-direction: column;
    `;
  },
  item: (isOpen: boolean) => {
    return css`
      display: flex;
      flex-direction: column;
      ${isOpen && 'flex: 1 1 0%;'}
    `;
  },
  header: () => {
    return css`
      cursor: pointer;
      padding: 5px 12px;
      display: flex;
      align-items: center;
      font-size: 11px;
      border-color: rgb(213, 213, 213) currentcolor currentcolor;
      border-style: solid none none;
      border-width: 0.55px medium medium;
      border-image: none 100% / 1 / 0 stretch;
      color: rgb(45, 45, 45);
      font-family: Arial;
      font-weight: bold;
      text-decoration: none;
      text-shadow: rgb(255, 255, 255) 0px 1px 0px;
      background: rgb(255, 255, 255)
        linear-gradient(rgb(240, 240, 240) 5%, rgb(225, 225, 225) 100%) repeat
        scroll 0% 0%;
    `;
  },
};

export function AccordionLayout(props: AccordionLayoutProps) {
  return <div css={styles.container()}>{props.children}</div>;
}

AccordionLayout.Item = function AccordionItem(props: AccordionItemProps) {
  const { children, title, defaultOpended = false } = props;
  const [open, setOpen] = useState(defaultOpended);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div onClick={handleClick} css={styles.item(open)}>
      <div css={styles.header()}>{title}</div>
      {open && <div>{children}</div>}
    </div>
  );
};
