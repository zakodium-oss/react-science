/** @jsxImportSource @emotion/react */
import { Radio, type RadioProps } from '@blueprintjs/core';
import { css } from '@emotion/react';

import { enabledColor } from '../styles.js';

const buttonStyles = {
  radioGroup: css({
    display: 'flex',
    flexDirection: 'row',
    width: 'fit-content',
    ' & > *:first-of-type, & > *:first-of-type span': {
      borderRadius: '6px 0 0 6px',
    },
    ' & > *:last-of-type, & > *:last-of-type span': {
      borderRightWidth: 1,
      borderRadius: '0 6px 6px 0',
    },
  }),
  container: (disabled: boolean, large?: boolean) =>
    css({
      height: large ? '40px' : '30px',
      border: '1px solid rgba(0, 0, 0, 0.25)',
      borderRightWidth: 0,
      position: 'relative',
      paddingLeft: '0 !important',
      '.bp5-control-indicator': {
        display: 'none',
      },
      '&:hover': {
        color: enabledColor,
      },
      'input[type="radio"]:checked': {
        '& ~ div': {
          color: enabledColor,
        },
        '& ~ span': {
          boxSizing: 'border-box',
          border: `1px solid ${enabledColor} !important`,
          opacity: disabled ? 0.25 : 1,
        },
      },
      span: {
        position: 'absolute',
        top: -1,
        left: -1,
        right: -1,
        bottom: -1,
        zIndex: 10,
        borderWidth: '0 !important',
      },
    }),
  item: (disabled: boolean, large?: boolean) =>
    css({
      opacity: disabled ? 0.25 : 1,
      padding: large ? '0px 15px' : '0px 7px',
      width: '100%',
      height: '100%',
      cursor: 'pointer',
      lineHeight: large ? '40px' : '30px',
    }),
};

export function RadioButton(prop: RadioProps) {
  const { label, large, disabled = false, ...radioProps } = prop;
  return (
    <Radio
      disabled={disabled}
      large={large}
      css={buttonStyles.container(disabled, large)}
      {...radioProps}
    >
      <div css={buttonStyles.item(disabled, large)}>{label}</div>
      <span />
    </Radio>
  );
}
