/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import type { ValueRenderersProps } from './index.js';

export interface TitleProps extends ValueRenderersProps {
  value?: string;
}

const styles = {
  title: css({
    fontWeight: 'bold',
  }),
};
export function Title({ value, ...other }: TitleProps) {
  return (
    <div {...other} css={styles.title}>
      {value}
    </div>
  );
}
