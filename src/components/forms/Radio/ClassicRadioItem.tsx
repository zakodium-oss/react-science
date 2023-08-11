/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as RadioGroup from '@radix-ui/react-radio-group';

import { disabledColor, enabledColor } from '../styles';

import { ValueLabel, RadioProps } from './Radio';

const classicStyles = {
  container: (disabled: boolean) =>
    css({
      display: 'flex',
      alignItems: 'center',
      opacity: disabled ? 0.25 : 1,
      overflow: 'hidden',
      border: 'none',
    }),
  item: (disabled: boolean) =>
    css({
      width: 16,
      height: 16,
      borderRadius: '50%',
      border: '1px solid grey',
      backgroundColor: disabled ? disabledColor : 'white',
      ':hover': {
        borderColor: disabled ? enabledColor : 'grey',
      },
    }),

  indicator: css({
    width: '100%',
    height: '100%',
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

  label: css({
    cursor: 'pointer',
    fontSize: '1.125em',
    lineHeight: 1,
    paddingLeft: 5,
  }),
};

export function ClassicRadioItem(
  prop: ValueLabel & Pick<RadioProps, 'onSelect'>,
) {
  const { value, label, disabled = false, onSelect } = prop;
  return (
    <div css={classicStyles.container(disabled)}>
      <RadioGroup.Item
        css={classicStyles.item(disabled)}
        value={value}
        id={value}
        onClick={() => {
          if (!disabled) onSelect?.(prop);
        }}
      >
        <RadioGroup.Indicator css={classicStyles.indicator}>
          <div css={classicStyles.circle} />
        </RadioGroup.Indicator>
      </RadioGroup.Item>
      <label css={classicStyles.label} htmlFor={value}>
        {label}
      </label>
    </div>
  );
}
