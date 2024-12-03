/** @jsxImportSource @emotion/react */
import { RadioGroup } from '@blueprintjs/core';
import type { RadioGroupProps } from '@blueprintjs/core';
import { css } from '@emotion/react';
import { Children, cloneElement } from 'react';

import { RadioButton } from './RadioButton.js';

export interface RadioButtonGroupProps extends RadioGroupProps {
  large?: boolean;
}
const rootStyles = {
  button: (large?: boolean) =>
    css({
      display: 'flex',
      flexDirection: 'row',
      width: 'fit-content',
      ' & > *:first-of-type, & > *:first-of-type span': {
        borderRadius: large ? '6px 0 0 6px' : '4px 0 0 4px',
      },
      ' & > *:last-of-type, & > *:last-of-type span': {
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
    children,
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
      {options?.map(({ value, label, disabled }) => {
        const childProps = {
          value,
          label,
          large,
          name,
          onChange,
          checked: value === selectedValue,
          disabled: groupDisabled || disabled,
        };
        return <RadioButton key={value} {...childProps} />;
      })}
      {Children.map(children, (child) => {
        if (!child || typeof child !== 'object' || !('type' in child)) {
          return child;
        }
        if (child.type === RadioButton) {
          return cloneElement(child, {
            ...child.props,
            large,
            name,
            onChange,
            checked: child.props.value === selectedValue,
            disabled: groupDisabled || child.props.disabled,
          });
        }
        return child;
      })}
    </RadioGroup>
  );
}
