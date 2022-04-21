/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

interface ColorProps {
  value?: string;
}
const styles = {
  color: css({
    position: 'absolute',
    top: '2px',
    left: '2px',
    right: '2px',
    bottom: '2px',
  }),
};
export function Color({ value }: ColorProps) {
  return (
    <div
      css={styles.color}
      style={{
        background: value,
      }}
    />
  );
}
