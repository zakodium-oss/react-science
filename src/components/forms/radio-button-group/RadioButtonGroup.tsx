/** @jsxImportSource @emotion/react */
import type { RadioGroupProps } from '@blueprintjs/core';
import { RadioGroup } from '@blueprintjs/core';
import { css } from '@emotion/react';

import { RadioButton } from './RadioButton.js';

export interface RadioButtonGroupProps extends RadioGroupProps {
  large?: boolean;
}
const rootStyles = {
  button: (large?: boolean) =>
    css({
      display: 'flex',
      width: 'fit-content',
      height: large ? '40px' : '30px',
      ' & > *:first-of-type, & > *:first-of-type': {
        borderRadius: large ? '6px 0 0 6px' : '4px 0 0 4px',
      },
      ' & > *:last-of-type, & > *:last-of-type': {
        borderRightWidth: 1,
        borderRadius: large ? '0 6px 6px 0' : '0 4px 4px 0',
      },
    }),
};
export function RadioButtonGroup(props: RadioButtonGroupProps) {
  const {
    disabled: groupDisabled = false,
    options = [],
    name,
    large,
    selectedValue,
    onChange,
    ...restProps
  } = props;

  return (
    <RadioGroup
      name={name}
      selectedValue={selectedValue}
      onChange={onChange}
      css={rootStyles.button(large)}
      {...restProps}
    >
      {options?.map(({ value, label, disabled }, index) => {
        return (
          <RadioButton
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            value={value}
            label={label}
            large={large}
            name={name}
            onChange={onChange}
            checked={value === selectedValue}
            disabled={groupDisabled || disabled}
          />
        );
      })}
    </RadioGroup>
  );
}
