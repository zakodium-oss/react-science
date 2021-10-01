/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { CSSProperties, ReactNode } from 'react';

interface Colorhover {
  basic: CSSProperties['backgroundColor'];
  hover?: CSSProperties['backgroundColor'];
}

interface ButtonProps {
  children: ReactNode;
  backgroundColor: Colorhover;
  color: Colorhover;
  onClick?: () => void;
}

export function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      css={css({
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        borderWidth: 1,
        borderColor: 'transparent',
        fontSize: 14,
        borderRadius: 6,
        color: props.color.basic,
        minWidth: 70,
        justifyContent: 'center',
        backgroundColor: props.backgroundColor.basic,
        ':hover': {
          color: props.color.hover,
          backgroundColor: props.backgroundColor.hover,
        },
      })}
      type="button"
    >
      {props.children}
    </button>
  );
}
