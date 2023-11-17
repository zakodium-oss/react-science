import { Checkbox, FormGroup, InputGroup, TextArea } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { useState } from 'react';

import { Button, RadioGroup, Select, RadioOption } from '../../src/components';

export default {
  title: 'Forms / Form',
};

const ExampleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export function Control() {
  const [status, setStatus] = useState<string | undefined>('single');
  const [question, setQuestion] = useState<number[]>([]);
  const [radio, setRadio] = useState<RadioOption | undefined>(undefined);
  return (
    <ExampleGroup style={{ display: 'inline-block' }}>
      <FormGroup
        label="Name"
        labelFor="name"
        labelInfo={<span style={{ color: 'red' }}>*</span>}
        intent="danger"
      >
        <InputGroup type="text" maxLength={10} />
      </FormGroup>
      <FormGroup label="Email" labelFor="email">
        <InputGroup type="email" />
      </FormGroup>
      <FormGroup label="date of birth" labelFor="bd">
        <InputGroup type="date" />
      </FormGroup>
      <FormGroup label="Status" labelFor="status">
        <Select
          options={[
            [
              { label: 'Single', value: 'single' },
              { label: 'Married', value: 'married' },
              { label: 'Divorced', value: 'divorced' },
            ],
          ]}
          value={status}
          onSelect={(value) => setStatus(value)}
        />
      </FormGroup>
      <FormGroup label="Question" labelFor="question">
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
        <TextArea />
      </FormGroup>

      <Button>Submit</Button>
    </ExampleGroup>
  );
}
