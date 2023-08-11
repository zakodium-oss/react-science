import styled from '@emotion/styled';
import { useState } from 'react';

import { Radio, ValueLabel } from '../../src/components';

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
      <Radio options={options} selected={option} onSelect={setOption} />
      <Radio
        options={options}
        selected={option}
        onSelect={setOption}
        type="button"
      />
    </ExampleGroup>
  );
}
