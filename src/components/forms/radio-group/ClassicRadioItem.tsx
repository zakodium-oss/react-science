/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as RadioGroup from '@radix-ui/react-radio-group';

import { disabledColor, enabledColor, InputVariant } from '../styles';

import { RadioOption, RadioGroupProps } from './RadioGroup';

const classicStyles = {
  container: (disabled: boolean) =>
    css({
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row-reverse',
      opacity: disabled ? 0.25 : 1,
      overflow: 'hidden',
      border: 'none',
    }),
  item: (disabled: boolean, variant?: InputVariant) =>
    css({
      position: 'relative',
      width: variant === 'default' ? 16 : 14,
      height: variant === 'default' ? 16 : 14,
      borderRadius: '50%',
      border: '1px solid grey',
      backgroundColor: disabled ? disabledColor : 'white',
      ':hover': {
        borderColor: disabled ? 'grey' : enabledColor,
      },
    }),

  indicator: css({
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: enabledColor,
    borderRadius: '50%',
  }),
  circle: css({
    width: '40%',
    height: '40%',
    borderRadius: '50%',
    backgroundColor: 'white',
  }),

  label: (disabled: boolean) =>
    css({
      cursor: 'pointer',
      lineHeight: 1,
      paddingLeft: 5,
      fontSize: '12px',
      ':hover': {
        '& ~ button': {
          borderColor: disabled ? 'grey' : enabledColor,
        },
      },
    }),
};

export function ClassicRadioItem(
  props: RadioOption & Pick<RadioGroupProps, 'onSelect' | 'variant' | 'name'>,
) {
  const { value, label, disabled = false, onSelect, variant, name } = props;
  return (
    <div css={classicStyles.container(disabled)}>
      <label
        css={classicStyles.label(disabled)}
        style={{
          fontSize: variant === 'small' ? '1em' : '1.125em',
        }}
        htmlFor={`${value}${name}`}
      >
        {label}
      </label>
      <RadioGroup.Item
        css={classicStyles.item(disabled, variant)}
        value={value}
        id={`${value}${name}`}
        onClick={() => {
          if (!disabled) onSelect?.(props);
        }}
      >
        <RadioGroup.Indicator css={classicStyles.indicator}>
          <div css={classicStyles.circle} />
        </RadioGroup.Indicator>
      </RadioGroup.Item>
    </div>
  );
}
