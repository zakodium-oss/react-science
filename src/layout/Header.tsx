/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactElement } from 'react';

import { ToolbarProps } from './Toolbar';

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

    boxShadow: 'rgb(255, 255, 255) 0px 1px 0px 0px inset',
    background:
      'rgb(255, 255, 255) linear-gradient(rgb(255, 255, 255) 5%, rgb(246, 246, 246) 100%) repeat scroll 0% 0%',
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
