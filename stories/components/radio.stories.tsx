import { RadioGroup, type RadioGroupProps } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { useState } from 'react';

import {
  RadioButton,
  RadioButtonGroup,
  type RadioButtonGroupProps,
} from '../../src/components/index.js';

export default {
  title: 'Forms / Radio',
};

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2', disabled: true },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
];

const ExampleGroup = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export function ControlBlueprint(
  props: Omit<RadioGroupProps, 'onChange' | 'selectedValue' | 'children'>,
) {
  const [option, setOption] = useState(options[2].value);
  return (
    <ExampleGroup>
      <RadioGroup
        onChange={(event) => {
          const value = event.currentTarget.value;
          setOption(value);
        }}
        selectedValue={option}
        options={options}
        {...props}
      />
    </ExampleGroup>
  );
}
ControlBlueprint.args = {
  label: 'Radio Group label',
  disabled: false,
  inline: false,
};

export function ControlRadioButton(
  props: Omit<RadioButtonGroupProps, 'options' | 'selectedValue' | 'onChange'>,
) {
  const [option, setOption] = useState(options[2].value);
  return (
    <ExampleGroup>
      <RadioButtonGroup
        options={options}
        selectedValue={option}
        onChange={(event) => {
          const value = event.currentTarget.value;
          setOption(value);
        }}
        {...props}
      />
    </ExampleGroup>
  );
}
ControlRadioButton.args = {
  large: false,
  disabled: false,
};

export function RadioButtonWithChildren(
  props: Omit<RadioButtonGroupProps, 'options' | 'selectedValue' | 'onChange'>,
) {
  const [option, setOption] = useState(options[2].value);
  return (
    <ExampleGroup>
      <RadioButtonGroup
        selectedValue={option}
        onChange={(event) => {
          const value = event.currentTarget.value;
          setOption(value);
        }}
        {...props}
      >
        {options.map(({ value, label, disabled }) => (
          <RadioButton
            key={value}
            value={value}
            label={label}
            disabled={disabled}
          />
        ))}
      </RadioButtonGroup>
    </ExampleGroup>
  );
}
RadioButtonWithChildren.args = {
  large: false,
  disabled: false,
};
