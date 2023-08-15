import styled from '@emotion/styled';
import { useState } from 'react';

import { RadioGroup, RadioOption, RadioGroupProps } from '../../src/components';

export default {
  title: 'Forms / Radio',
};

const options: RadioOption[] = [
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
export function Basic() {
  const [option, setOption] = useState(options[2]);
  return (
    <ExampleGroup>
      <RadioGroup
        options={options}
        selected={option}
        onSelect={setOption}
        name="classic"
      />
      <RadioGroup
        options={options}
        selected={option}
        onSelect={setOption}
        variant="small"
        name="small_classic"
      />
      <RadioGroup
        options={options}
        selected={option}
        onSelect={setOption}
        type="button"
        name="button"
      />
      <RadioGroup
        options={options}
        selected={option}
        onSelect={setOption}
        variant="small"
        type="button"
        name="small_button"
      />
    </ExampleGroup>
  );
}
export function Control(
  props: Omit<RadioGroupProps, 'options' | 'selected' | 'onSelect' | 'name'>,
) {
  const [option, setOption] = useState(options[2]);
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
Control.args = {
  variant: 'default',
  type: 'classic',
  disabled: false,
};

Control.argTypes = {
  variant: {
    options: ['default', 'small'],
    control: { type: 'radio' },
  },
  type: {
    options: ['classic', 'button'],
    control: { type: 'radio' },
  },
};
