/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { CSSProperties } from 'react';

interface TextProps {
  value?: string;
  style?: CSSProperties;
}
const styles = {
  text: css({
    textOverflow: 'ellipsis',
  }),
};
// todo: delete style after merging with improve measurement panel PR

export function Text({ value, style }: TextProps) {
  return (
    <div style={style} css={styles.text}>
      {value}
    </div>
  );
}
