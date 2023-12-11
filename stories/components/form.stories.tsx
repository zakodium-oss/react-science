import {
  Checkbox,
  FormGroup,
  HTMLSelect,
  InputGroup,
  TextArea,
} from '@blueprintjs/core';
import styled from '@emotion/styled';
import { useState } from 'react';

import { Button, RadioGroup, RadioOption } from '../../src/components';

export default {
  title: 'Forms / Form',
};

const ExampleGroup = styled.div`
  display: inline-block;
  flex-direction: column;
  gap: 10px;
`;

export function Control() {
  const [status, setStatus] = useState<string>('single');
  const [question, setQuestion] = useState<number[]>([]);
  const [radio, setRadio] = useState<RadioOption | undefined>(undefined);
  return (
    <ExampleGroup>
      <FormGroup
        label="Name"
        labelFor="name"
        labelInfo={<span style={{ color: 'red' }}>*</span>}
        intent="danger"
      >
        <InputGroup id="name" type="text" maxLength={10} />
      </FormGroup>
      <FormGroup label="Email" labelFor="email">
        <InputGroup id="email" type="email" />
      </FormGroup>
      <FormGroup label="date of birth" labelFor="bd">
        <InputGroup id="bd" type="date" />
      </FormGroup>
      <FormGroup label="Status" labelFor="status">
        <HTMLSelect
          id="status"
          options={[
            { label: 'Single', value: 'single' },
            { label: 'Married', value: 'married' },
            { label: 'Divorced', value: 'divorced' },
          ]}
          value={status}
          onChange={(target) => {
            setStatus(target.currentTarget.value);
          }}
        />
      </FormGroup>
      <FormGroup label="Question">
        <Checkbox
          label="Answer 1"
          checked={question.includes(1)}
          onChange={({ target }) =>
            target.checked
              ? setQuestion([...question, 1])
              : setQuestion(question.filter((item) => item !== 1))
          }
        />
        <Checkbox
          label="Answer 2"
          checked={question.includes(2)}
          onChange={({ target }) =>
            target.checked
              ? setQuestion([...question, 2])
              : setQuestion(question.filter((item) => item !== 2))
          }
        />
        <Checkbox
          label="Answer 3"
          checked={question.includes(3)}
          onChange={({ target }) =>
            target.checked
              ? setQuestion([...question, 3])
              : setQuestion(question.filter((item) => item !== 3))
          }
        />
      </FormGroup>
      <FormGroup label="Radio" labelFor="radio">
        <RadioGroup
          id="radio"
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
          ]}
          selected={radio}
          onSelect={setRadio}
          name="radio"
        />
      </FormGroup>
      <FormGroup label="Introduction" labelFor="introduction">
        <TextArea id="introduction" />
      </FormGroup>

      <Button>Submit</Button>
    </ExampleGroup>
  );
}
