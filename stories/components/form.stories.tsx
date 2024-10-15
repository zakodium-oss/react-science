import {
  Checkbox,
  FormGroup,
  InputGroup,
  MenuItem,
  Radio,
  RadioGroup,
  TextArea,
} from '@blueprintjs/core';
import { HTMLSelect } from '@blueprintjs/core/lib/esnext';
import { type ItemRenderer, Select } from '@blueprintjs/select';
import styled from '@emotion/styled';
import { useState } from 'react';

import { Button } from '../../src/components/index.js';

export default {
  title: 'Forms / Form',
};

const ExampleGroup = styled.div`
  display: inline-block;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 10px;
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
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [question, setQuestion] = useState<number[]>([]);
  const [radio, setRadio] = useState<string | undefined>(undefined);
  return (
    <ExampleGroup style={{ display: 'inline-block' }}>
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
      <FormGroup label="Country" labelFor="country">
        <Select
          items={['USA', 'Switzerland', 'Germany', 'France', 'UK']}
          itemRenderer={render}
          onItemSelect={(value) => {
            setCountry(value);
          }}
          filterable={false}
          activeItem={country}
        >
          <Button
            text={country ?? 'Select a country'}
            rightIcon="double-caret-vertical"
          />
        </Select>
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
          name="radio"
          onChange={(event) => {
            setRadio(event.currentTarget.value);
          }}
          selectedValue={radio}
        >
          <Radio label="Option 1" value="option1" />
          <Radio label="Option 2" value="option2" />
          <Radio label="Option 3" value="option3" />
        </RadioGroup>
      </FormGroup>
      <FormGroup label="Introduction" labelFor="introduction">
        <TextArea id="introduction" />
      </FormGroup>

      <Button>Submit</Button>
    </ExampleGroup>
  );
}
