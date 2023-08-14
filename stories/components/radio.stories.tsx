import styled from '@emotion/styled';
import { useState } from 'react';

import { RadioGroup, ValueLabel, RadioGroupProps } from '../../src/components';

export default {
  title: 'Forms / Radio',
};

const options: ValueLabel[] = [
  { label: 'Option 1', value: 'option1', disabled: true },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

const ExampleGroup = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export function Basic() {
  const [option, setOption] = useState(options[1]);
  return (
    <ExampleGroup>
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
        name="classic"
      />
      <RadioGroup
        options={options}
        selected={option}
        onSelect={setOption}
        variant="small"
        type="button"
        name="small_button"
      />
      <RadioGroup
        options={options}
        selected={option}
        onSelect={setOption}
        type="button"
        name="button"
      />
    </ExampleGroup>
  );
}
export function Control(
  props: Omit<RadioGroupProps, 'options' | 'selected' | 'onSelect' | 'name'>,
) {
  const [option, setOption] = useState(options[1]);
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
  disabled: true,
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
