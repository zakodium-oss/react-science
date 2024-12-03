/** @jsxImportSource @emotion/react */
import type { RadioGroupProps } from '@blueprintjs/core';
import { RadioGroup } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { Children, cloneElement } from 'react';

import { RadioButton } from './RadioButton.js';

export interface RadioButtonGroupProps extends RadioGroupProps {
  large?: boolean;
}

const RadioButtonContainer = styled.div<{ large?: boolean }>`
  display: flex;
  & label:first-of-type {
    border-bottom-left-radius: ${(props) => (props.large ? '6px' : '4px')};
    border-top-left-radius: ${(props) => (props.large ? '6px' : '4px')};
  }
  & label:last-of-type {
    border-right-width: 1px;
    border-bottom-right-radius: ${(props) => (props.large ? '6px' : '4px')};
    border-top-right-radius: ${(props) => (props.large ? '6px' : '4px')};
  }
`;

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
      {...restProps}
    >
      <RadioButtonContainer large={large}>
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
      </RadioButtonContainer>
    </RadioGroup>
  );
}
