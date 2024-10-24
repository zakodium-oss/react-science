/** @jsxImportSource @emotion/react */
import { Radio } from '@blueprintjs/core';
import { css } from '@emotion/react';

import { enabledColor, type InputVariant } from '../styles.js';

import type { RadioButtonGroupProps, RadioOption } from './RadioGroup.js';

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
  container: (disabled: boolean) =>
    css({
      border: '1px solid rgba(0, 0, 0, 0.25)',
      borderRightWidth: 0,
      position: 'relative',
      paddingLeft: '0 !important',
      '.bp5-control-indicator': {
        display: 'none',
      },
      'input[type="radio"]:checked': {
        '& ~ div': {
          color: enabledColor,
        },
        '& ~ span': {
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
  item: (disabled: boolean, variant?: InputVariant) =>
    css({
      opacity: disabled ? 0.25 : 1,
      padding: variant === 'default' ? '0px 15px' : '0px 7px',
      width: '100%',
      height: '100%',
      cursor: 'pointer',
      ':hover': {
        '& > label': {
          color: disabled ? '' : enabledColor,
        },
      },
      fontSize: variant === 'small' ? '1em' : '1.125em',
      lineHeight: variant === 'default' ? '30px' : '22px',
    }),
};
export function ButtonRadioItem(
  prop: RadioOption & Pick<RadioButtonGroupProps, 'variant' | 'name'>,
) {
  const { value, label, disabled = false, variant, name } = prop;
  return (
    <Radio
      name={name}
      value={value}
      disabled={disabled}
      key={value}
      css={buttonStyles.container(disabled)}
    >
      <div css={buttonStyles.item(disabled, variant)}>{label}</div>
      <span />
    </Radio>
  );
}
