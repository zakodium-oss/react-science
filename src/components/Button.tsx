/** @jsxImportSource @emotion/react */
import { css, CSSObject, SerializedStyles } from '@emotion/react';
import {
  ReactNode,
  ButtonHTMLAttributes,
  CSSProperties,
  MouseEvent,
} from 'react';

type Size = 'xSmall' | 'small' | 'medium' | 'large';

type Color = CSSProperties['color'];

interface BaseColor {
  basic: Color;
  hover?: Color;
  active?: Color;
}

type Fill = 'clear' | 'outline' | 'solid';

type ColorTheme =
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'medium'
  | 'light';

type ColorPalettes = Record<
  ColorTheme,
  {
    basic: Color;
    shade: Color;
    tint: Color;
  }
>;

const colorPalettes: ColorPalettes = {
  primary: {
    basic: '#3880ff',
    shade: '#3171e0',
    tint: '#4c8dff',
  },
  success: {
    basic: '#2dd36f',
    shade: '#28ba62',
    tint: '#42d77d',
  },
  danger: {
    basic: '#eb445a',
    shade: '#cf3c4f',
    tint: '#ed576b',
  },
  warning: {
    basic: '#ffc409',
    shade: '#e0ac08',
    tint: '#ffca22',
  },
  medium: {
    basic: '#92949c',
    shade: '#808289',
    tint: '#9d9fa6',
  },
  light: {
    basic: '#f4f5f8',
    shade: '#d7d8da',
    tint: '#f5f6f9',
  },
};

const sizeConfig: Record<
  Size,
  Pick<CSSProperties, 'fontSize' | 'padding' | 'borderRadius'>
> = {
  xSmall: {
    fontSize: '0.75rem',
    padding: '0.15rem 0.3rem',
    borderRadius: '0.15rem',
  },
  small: {
    fontSize: '0.8rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.2rem',
  },
  medium: {
    fontSize: '1rem',
    padding: '0.375rem 0.75rem',
    borderRadius: '0.25rem',
  },
  large: {
    fontSize: '1.25rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.3rem',
  },
};

interface ButtonStyle {
  color: BaseColor;
  size: Size;
  borderColor: Color;
  backgroundColor: BaseColor;
  borderRadius?: CSSProperties['borderRadius'];
  fill?: Fill;
  style?: CSSObject;
}

interface Style {
  button: (props: ButtonStyle) => SerializedStyles;
}

function getFillStyle(props: ButtonStyle) {
  const { borderColor, fill, backgroundColor, color } = props;

  switch (fill) {
    case 'solid': {
      return css`
        border-color: transparent;
        background-color: ${backgroundColor.basic};
        color: ${color.hover};
      `;
    }
    case 'outline': {
      return css`
        border-style: solid;
        border-color: ${backgroundColor.basic};
        background-color: transparent;
        color: ${color.basic};
      `;
    }

    case 'clear': {
      return css`
        border-color: transparent;
        background-color: transparent;
        color: ${color.basic};
      `;
    }
    default:
      return css`
        background-color: ${backgroundColor.basic};
        color: ${color.basic};
        border-color: ${borderColor};
      `;
  }
}

const styles: Style = {
  button: (props) => {
    const { size, backgroundColor, color, borderRadius } = props;

    const basic = css`
      display: flex;
      flex-direction: row;
      border-width: 1px;
      align-items: center;
    `;

    const fillStyle = getFillStyle(props);

    const colorStyle = css`
      &:not([disabled]):hover {
        background-color: ${backgroundColor.hover};
        color: ${color.hover};
      }
      &:not([disabled]):active {
        background-color: ${backgroundColor?.active || backgroundColor.hover};
        color: ${color?.active || color.hover};
      }

      &:disabled {
        opacity: 0.25;
      }
    `;
    return css([
      basic,
      sizeConfig[size],
      fillStyle,
      colorStyle,
      { borderRadius },
    ]);
  },
};

export interface ButtonProps
  extends Partial<ButtonStyle>,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'style'> {
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

export function Button(props: ButtonProps) {
  const { basic, shade, tint } = colorPalettes.primary;
  const {
    onClick,
    size = 'medium',
    color = { basic: 'black', hover: 'white' },
    backgroundColor = { basic, hover: shade, active: tint },
    borderColor = 'transparent',
    fill,
    borderRadius,
    style = {},
    ...restProps
  } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      css={css(
        styles.button({
          size,
          backgroundColor,
          color,
          borderColor,
          fill,
          borderRadius,
        }),
        style,
      )}
      {...restProps}
    >
      <span style={{ flex: 1, pointerEvents: 'none' }}> {props.children}</span>
    </button>
  );
}

function ThemeButton(props: { colorTheme: ColorTheme } & ButtonProps) {
  const { colorTheme, ...buttonProps } = props;
  const { basic, shade, tint } = colorPalettes[props.colorTheme];

  const {
    color = { basic: shade, hover: 'white' },
    backgroundColor = {
      basic: basic,
      hover: shade,
      active: tint,
    },
    fill = 'solid',
    ...restProps
  } = buttonProps;
  return <Button {...{ fill, ...restProps, backgroundColor, color }} />;
}

Button.Success = (props: ButtonProps) => {
  return <ThemeButton {...props} colorTheme="success" />;
};
Button.Danger = (props: ButtonProps) => {
  return <ThemeButton {...props} colorTheme="danger" />;
};
Button.Warning = (props: ButtonProps) => {
  return <ThemeButton {...props} colorTheme="warning" />;
};
Button.Action = (props: ButtonProps) => {
  return <ThemeButton {...props} colorTheme="medium" />;
};
