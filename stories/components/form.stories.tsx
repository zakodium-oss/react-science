import { MenuItem } from '@blueprintjs/core';
import { Select, ItemRenderer } from '@blueprintjs/select';
import styled from '@emotion/styled';
import { useState } from 'react';

import {
  Button,
  Checkbox,
  Field,
  Input,
  RadioGroup,
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
const render: ItemRenderer<string> = (
  label,
  { handleClick, handleFocus, modifiers },
) => (
  <MenuItem
    active={modifiers.active}
    icon={modifiers.active ? 'tick' : 'blank'}
    key={label}
    onClick={handleClick}
    onFocus={handleFocus}
    roleStructure="listoption"
    text={label}
  />
);

export function Control() {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [question, setQuestion] = useState<number[]>([]);
  const [radio, setRadio] = useState<RadioOption | undefined>(undefined);
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
          items={['Single', 'Married', 'Divorced']}
          itemRenderer={render}
          onItemSelect={setStatus}
          filterable={false}
          activeItem={status}
        >
          <Button
            text={status ?? 'Select a status'}
            rightIcon="double-caret-vertical"
          />
        </Select>
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
      <Field label="Radio" name="radio">
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
      <Field label="Introduction" name="introduction">
        <TextArea />
      </Field>

      <Button>Submit</Button>
    </ExampleGroup>
  );
}
