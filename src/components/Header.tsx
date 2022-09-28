/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import type { ReactElement } from 'react';

import type { ToolbarProps } from './Toolbar';

type ReactProps = ReactElement<ToolbarProps>;

interface HeaderProps {
  children: [ReactProps, ReactProps];
}

const styles = {
  header: css({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',

    justifyContent: 'space-between',
    borderBottom: '1px solid rgb(247, 247, 247);',

    boxShadow: 'rgb(255, 255, 255) 0px 1px 0px 0px inset',
  }),
};

export function Header(props: HeaderProps) {
  return (
    <div css={styles.header}>
      <div>{props.children[0]}</div>
      <div>{props.children[1]}</div>
    </div>
  );
}
