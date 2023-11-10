import styled from '@emotion/styled';
import { useState } from 'react';

import {
  Button,
  Checkbox,
  Field,
  Input,
  RadioGroup,
  Select,
  TextArea,
  RadioOption,
} from '../../src/components';

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
      <Field label="Name" labelFor="name" required>
        <Input type="text" maxLength={10} />
      </Field>
      <Field label="Email" labelFor="email">
        <Input type="email" />
      </Field>
      <Field label="date of birth" labelFor="bd">
        <Input type="date" />
      </Field>
      <Field label="Status" labelFor="status">
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
      </Field>
      <Field label="Question" labelFor="question">
        <Checkbox
          label="Answer 1"
          checked={question.includes(1)}
          onChange={(checked) =>
            checked
              ? setQuestion([...question, 1])
              : setQuestion(question.filter((item) => item !== 1))
          }
        />
        <Checkbox
          label="Answer 2"
          checked={question.includes(2)}
          onChange={(checked) =>
            checked
              ? setQuestion([...question, 2])
              : setQuestion(question.filter((item) => item !== 2))
          }
        />
        <Checkbox
          label="Answer 3"
          checked={question.includes(3)}
          onChange={(checked) =>
            checked
              ? setQuestion([...question, 3])
              : setQuestion(question.filter((item) => item !== 3))
          }
        />
      </Field>
      <Field label="Radio" labelFor="radio">
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
      </Field>
      <Field label="Introduction" labelFor="introduction">
        <TextArea />
      </Field>

      <Button>Submit</Button>
    </ExampleGroup>
  );
}
