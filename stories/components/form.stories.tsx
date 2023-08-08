import styled from '@emotion/styled';
import { useState } from 'react';

import {
  Button,
  Checkbox,
  Field,
  Input,
  Select,
  TextArea,
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
  return (
    <ExampleGroup style={{ display: 'inline-block' }}>
      <Field label="Name" name="name" required>
        <Input type="text" maxLength={10} />
      </Field>
      <Field label="Email" name="email">
        <Input type="email" />
      </Field>
      <Field label="date of birth" name="bd">
        <Input type="date" />
      </Field>
      <Field label="Status" name="status">
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
      <Field label="Question" name="question">
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

      <Field label="Introduction" name="introduction">
        <TextArea />
      </Field>

      <Button>Submit</Button>
    </ExampleGroup>
  );
}
