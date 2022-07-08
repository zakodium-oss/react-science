/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

import { ValueRenderersProps } from '.';

interface TitleProps extends ValueRenderersProps {
  value?: string;
  sorted?: 'asc' | 'desc' | false;
}

const styles = {
  title: css({
    fontWeight: 'bold',
  }),
};
export function Title({ value, sorted = false, ...other }: TitleProps) {
  return (
    <div {...other} css={styles.title}>
      {value}
      {sorted
        ? {
            asc: ' 🔼',
            desc: ' 🔽',
          }[sorted]
        : null}
    </div>
  );
}
