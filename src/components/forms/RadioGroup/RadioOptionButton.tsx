/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as RadioGroup from '@radix-ui/react-radio-group';

import { enabledColor, InputVariant } from '../styles';

import { ValueLabel, RadioGroupProps } from './RadioGroup';

const buttonStyles = {
  container: (disabled: boolean) =>
    css({
      position: 'relative',
      borderColor: disabled ? 'black' : 'rgba(0, 0, 0, 0.25)',
      opacity: disabled ? 0.25 : 1,
    }),
  item: (disabled: boolean, variant?: InputVariant) =>
    css({
      padding: variant === 'default' ? '12px 10px' : '8px 8px',
      width: '100%',
      height: '100%',
      cursor: 'pointer',
      ':hover': {
        '& > label': {
          color: disabled ? 'black' : enabledColor,
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

  label: css({
    cursor: 'pointer',
    lineHeight: 1,
  }),
};

export function RadioOptionButton(
  prop: ValueLabel & Pick<RadioGroupProps, 'onSelect' | 'variant' | 'name'>,
) {
  const { value, label, disabled = false, onSelect, variant, name } = prop;
  return (
    <div css={buttonStyles.container(disabled)}>
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
          css={buttonStyles.label}
          htmlFor={`${value}${name}`}
          style={{
            fontSize: variant === 'small' ? '1em' : '1.125em',
          }}
        >
          {label}
        </label>
      </RadioGroup.Item>
    </div>
  );
}
