/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import type { ValueRenderersProps } from '.';

interface ColorProps extends ValueRenderersProps {
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
export function Color({ value, style, onClick }: ColorProps) {
  return (
    <div
      onClick={onClick}
      css={styles.color}
      style={{
        background: value,
        ...style,
      }}
    />
  );
}
