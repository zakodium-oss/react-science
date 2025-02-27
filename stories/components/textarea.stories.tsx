import type { TextAreaProps } from '@blueprintjs/core';
import { FormGroup, TextArea } from '@blueprintjs/core';
import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';
import { useState } from 'react';

export default {
  title: 'Forms / TextArea',
};

const ExampleGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

export function Control(prop: Omit<TextAreaProps, 'value'>) {
  const [state, setState] = useState('');

  const { onChange: onChangeProps, ...otherProps } = prop;

  function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setState(event.target.value);
    onChangeProps?.(event);
  }

  return (
    <ExampleGroup>
      <TextArea {...otherProps} value={state} onChange={onChange} />
    </ExampleGroup>
  );
}
Control.args = {
  placeholder: 'Control example',
  size: 'medium',
  help: '',
  error: '',
  valid: false,
};
Control.argTypes = {
  onChange: { action: 'onChange' },
  size: {
    control: { type: 'radio' },
    options: ['small', 'medium', 'large'],
  },
  valid: {
    control: { type: 'inline-radio' },
    options: [true, false, 'valid message'],
  },
};

export function WithLabel(prop: Omit<TextAreaProps, 'value' | 'onChange'>) {
  const [state, setState] = useState('Hello, World!');

  function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setState(event.target.value);
  }

  return (
    <ExampleGroup>
      <FormGroup
        labelFor="TextAreaLabel"
        label="Label"
        labelInfo={<span style={{ color: 'red' }}>*</span>}
      >
        <TextArea
          id="TextAreaLabel"
          name="TextAreaLabel"
          {...prop}
          value={state}
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup label="Label of two Textarea">
        <TextArea placeholder="a" />
        <TextArea placeholder="b" />
      </FormGroup>
    </ExampleGroup>
  );
}
WithLabel.args = {
  placeholder: 'Placeholder',
  variant: 'default',
  help: '',
  error: '',
  valid: false,
};
WithLabel.argTypes = {
  variant: {
    options: ['default', 'small'],
    control: { type: 'radio' },
  },
  valid: {
    options: [true, false, 'valid message'],
    control: { type: 'radio' },
  },
};
