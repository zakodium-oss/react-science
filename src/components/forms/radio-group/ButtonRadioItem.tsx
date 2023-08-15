/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as RadioGroup from '@radix-ui/react-radio-group';

import { enabledColor, InputVariant } from '../styles';

import { RadioOption, RadioGroupProps } from './RadioGroup';

const buttonStyles = {
  container: css({
    border: '1px solid rgba(0, 0, 0, 0.25)',
    borderRightWidth: 0,
    position: 'relative',
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
    }),

  indicator: css({
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    zIndex: 10,
    border: '1px solid',
    borderColor: enabledColor,

    '& ~ label': {
      color: enabledColor,
    },
  }),

  label: (variant?: InputVariant) =>
    css({
      cursor: 'pointer',
      fontSize: variant === 'small' ? '1em' : '1.125em',
      lineHeight: variant === 'default' ? '30px' : '22px',
    }),
};

export function ButtonRadioItem(
  prop: RadioOption & Pick<RadioGroupProps, 'onSelect' | 'variant' | 'name'>,
) {
  const { value, label, disabled = false, onSelect, variant, name } = prop;
  return (
    <div css={buttonStyles.container}>
      <RadioGroup.Item
        css={buttonStyles.item(disabled, variant)}
        value={value}
        id={`${value}${name}`}
        onClick={() => {
          if (!disabled) onSelect?.(prop);
        }}
      >
        <RadioGroup.Indicator css={buttonStyles.indicator} />
        <label
          css={buttonStyles.label(variant)}
          htmlFor={`${value}${name}`}
          style={{}}
        >
          {label}
        </label>
      </RadioGroup.Item>
    </div>
  );
}
