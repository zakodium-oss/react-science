/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import type { ValueRenderersProps } from './index.js';

interface TextProps extends ValueRenderersProps {
  value?: string;
}
const styles = {
  text: css({
    textOverflow: 'ellipsis',
  }),
};

export function Text({ value, ...other }: TextProps) {
  return (
    <div {...other} css={styles.text}>
      {value}
    </div>
  );
}
