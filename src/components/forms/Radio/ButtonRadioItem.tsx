/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as RadioGroup from '@radix-ui/react-radio-group';

import { enabledColor } from '../styles';

import { ValueLabel, RadioProps } from './Radio';

const buttonStyles = {
  container: (disabled: boolean) =>
    css({
      position: 'relative',
      borderColor: disabled ? 'black' : 'rgba(0, 0, 0, 0.25)',
      opacity: disabled ? 0.25 : 1,
    }),
  item: (disabled: boolean) =>
    css({
      padding: '15px 10px',
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
    border: '1px solid',
    borderColor: enabledColor,

    '& ~ label': {
      color: enabledColor,
    },
  }),

  label: css({
    cursor: 'pointer',
    fontSize: '1.125em',
    lineHeight: 1,
  }),
};

export function ButtonRadioItem(
  prop: ValueLabel & Pick<RadioProps, 'onSelect'>,
) {
  const { value, label, disabled = false, onSelect } = prop;
  return (
    <div css={buttonStyles.container(disabled)}>
      <RadioGroup.Item
        css={buttonStyles.item(disabled)}
        value={value}
        id={value}
        onClick={() => {
          if (!disabled) onSelect?.(prop);
        }}
      >
        <RadioGroup.Indicator css={buttonStyles.indicator} />
        <label css={buttonStyles.label} htmlFor={value}>
          {label}
        </label>
      </RadioGroup.Item>
    </div>
  );
}
