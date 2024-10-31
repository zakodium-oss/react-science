/** @jsxImportSource @emotion/react */
import { RadioGroup, type RadioGroupProps } from '@blueprintjs/core';
import { css } from '@emotion/react';

import { type InputVariant } from '../styles.js';

import { RadioButtonItem } from './ButtonRadioItem.js';

export interface RadioButtonGroupProps extends RadioGroupProps {
  variant?: InputVariant;
}
const rootStyles = {
  button: (variant: InputVariant) =>
    css({
      display: 'flex',
      flexDirection: 'row',
      width: 'fit-content',
      ' & > *:first-of-type, & > *:first-of-type span': {
        borderRadius: variant === 'default' ? '6px 0 0 6px' : '4px 0 0 4px',
      },
      ' & > *:last-of-type, & > *:last-of-type span': {
        borderRightWidth: 1,
        borderRadius: variant === 'default' ? '0 6px 6px 0' : '0 4px 4px 0',
      },
    }),
};
export function RadioButtonGroup(props: RadioButtonGroupProps) {
  const {
    disabled: groupDisabled = false,
    options = [],
    name = 'radio-group',
    variant = 'default',
    ...restProps
  } = props;
  return (
    <RadioGroup name={name} css={rootStyles.button(variant)} {...restProps}>
      {options?.map(({ value, label, disabled }) => {
        const childProps = {
          value,
          label,
          disabled: groupDisabled || disabled,
          variant,
          name,
        };
        return <RadioButtonItem key={value} {...childProps} />;
      })}
    </RadioGroup>
  );
}
