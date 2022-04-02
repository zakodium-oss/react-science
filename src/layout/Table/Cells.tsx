/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const styles = {
  color: css({
    position: 'absolute',
    top: '2px',
    left: '2px',
    right: '2px',
    bottom: '2px',
  }),
  header: css({
    fontWeight: 'bold',
  }),
  text: css({
    textOverflow: 'ellipsis',
  }),
};
export function ColorCell({ value }: { value: string }) {
  return (
    <div
      css={styles.color}
      style={{
        background: value,
      }}
    />
  );
}
export function HeaderCell({ value }: { value?: string }) {
  return <div css={styles.header}>{value}</div>;
}
export function NumberCell({
  value,
  fixed,
}: {
  value?: number;
  fixed?: number;
}) {
  return <div>{value ? (fixed ? value.toFixed(fixed) : value) : ''}</div>;
}
export function TextCell({ value }: { value?: string }) {
  return <div css={styles.text}>{value}</div>;
}
export function BooleanCell({ value }: { value?: boolean }) {
  return <div>{value !== undefined ? (value ? '✔' : '✘') : ''}</div>;
}
