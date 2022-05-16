/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { CSSProperties, ReactNode } from 'react';

interface Colorhover {
  basic: CSSProperties['backgroundColor'];
  hover?: CSSProperties['backgroundColor'];
}

interface ButtonProps {
  children: ReactNode;
  backgroundColor?: Colorhover;
  color?: Colorhover;
  onClick?: () => void;
}

export function Button(props: ButtonProps) {
  const {
    backgroundColor = {
      basic: 'hsl(21deg, 90%, 48%)',
      hover: 'hsl(21deg, 90%, 40%)',
    },
    color = { basic: 'white', hover: 'white' },
  } = props;

  return (
    <button
      onClick={props.onClick}
      css={css({
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 6,
        paddingBottom: 6,
        borderWidth: 1,
        borderColor: 'transparent',
        fontSize: 14,
        borderRadius: 6,
        color: color.basic,
        minWidth: 70,
        justifyContent: 'center',
        backgroundColor: backgroundColor.basic,
        ':hover': {
          color: color.hover,
          backgroundColor: backgroundColor.hover,
        },
      })}
      type="button"
    >
      {props.children}
    </button>
  );
}
