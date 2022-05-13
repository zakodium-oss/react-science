/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

interface TitleProps {
  value?: string;
}

const styles = {
  title: css({
    fontWeight: 'bold',
  }),
};
export function Title({ value }: TitleProps) {
  return <div css={styles.title}>{value}</div>;
}
