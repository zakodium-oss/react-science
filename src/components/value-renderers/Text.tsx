/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

interface TextProps {
  value?: string;
}
const styles = {
  text: css({
    textOverflow: 'ellipsis',
  }),
};

export function Text({ value }: TextProps) {
  return <div css={styles.text}>{value}</div>;
}
