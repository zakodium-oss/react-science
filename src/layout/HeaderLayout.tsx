/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { ReactElement } from 'react';

import { ToolbarProps } from './ToolbarLayout';

type ReactProps = ReactElement<ToolbarProps>;

interface HeaderLayoutProps {
  children: [ReactProps, ReactProps];
}

const styles = {
  header: css({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '5px',
    paddingRight: '5px',
    justifyContent: 'space-between',

    borderWidth: '1px 1px 0px',
    borderStyle: 'solid',
    borderColor: 'rgb(213, 213, 213)',

    boxShadow: 'rgb(255, 255, 255) 0px 1px 0px 0px inset',
    background:
      'rgb(255, 255, 255) linear-gradient(rgb(255, 255, 255) 5%, rgb(246, 246, 246) 100%) repeat scroll 0% 0%',
  }),
};

export function HeaderLayout(props: HeaderLayoutProps) {
  return (
    <div css={styles.header}>
      <div>{props.children[0]}</div>
      <div>{props.children[1]}</div>
    </div>
  );
}
