import {
  RadioGroup as BlueprintjsRadioGroup,
  RadioGroupProps as BlueprintjsRadioGroupProps,
} from '@blueprintjs/core';
import styled from '@emotion/styled';
import { useState } from 'react';

import { RadioGroup, RadioOption, RadioGroupProps } from '../../src/components';

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
  props: Omit<
    BlueprintjsRadioGroupProps,
    'onChange' | 'selectedValue' | 'children'
  >,
) {
  const [option, setOption] = useState(options[2]);
  return (
    <ExampleGroup>
      <BlueprintjsRadioGroup
        onChange={(event) => {
          const value = event.currentTarget.value;
          setOption(
            (option) => options.find((o) => o.value === value) || option,
          );
        }}
        selectedValue={option.value}
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
export function ControlButton(
  props: Omit<RadioGroupProps, 'options' | 'selected' | 'onSelect' | 'name'>,
) {
  const [option, setOption] = useState(options[2] as RadioOption);
  return (
    <ExampleGroup>
      <RadioGroup
        options={options}
        selected={option}
        onSelect={setOption}
        {...props}
      />
    </ExampleGroup>
  );
}
ControlButton.args = {
  variant: 'default',
  disabled: false,
};

ControlButton.argTypes = {
  variant: {
    options: ['default', 'small'],
    control: { type: 'radio' },
  },
};
