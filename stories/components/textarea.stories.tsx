import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';
import { FaUser, FaShieldAlt } from 'react-icons/fa';

import { Field, TextArea, TextAreaProps } from '../../src/components';

export default {
  title: 'Forms / TextArea',
};

const ExampleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export function Control(
  prop: Omit<TextAreaProps, 'value' | 'onChange'> & {
    leadingAddon: boolean;
    inlineLeadingAddon: boolean;
    trailingAddon: boolean;
    inlineTrailingAddon: boolean;
  },
) {
  const [state, setState] = useState('');

  function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setState(event.target.value);
  }

  return (
    <ExampleGroup style={{ width: '80px' }}>
      <TextArea {...prop} value={state} onChange={onChange} />
    </ExampleGroup>
  );
}
Control.args = {
  placeholder: 'Control example',
  maxLength: 10,
  variant: 'default',
  loading: false,
  help: '',
  error: '',
  valid: false,
};
Control.argTypes = {
  variant: {
    options: ['default', 'small'],
    control: { type: 'radio' },
  },
  valid: {
    options: [true, false, 'valid message'],
    control: { type: 'radio' },
  },
};

export function WithLabel(prop: Omit<TextAreaProps, 'value' | 'onChange'>) {
  const [state, setState] = useState('Hello, World!');

  function onChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setState(event.target.value);
  }

  return (
    <ExampleGroup>
      <Field name="TextAreaLabel" label="Label" required>
        <TextArea
          name="TextAreaLabel"
          {...prop}
          value={state}
          onChange={onChange}
        />
      </Field>
      <Field label="Label of two Textarea" name="oneLabel">
        <TextArea placeholder="a" />
        <TextArea placeholder="b" />
      </Field>
    </ExampleGroup>
  );
}
WithLabel.args = {
  placeholder: 'Placeholder',
  variant: 'default',
  loading: false,
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

export function WithLeadingAddon() {
  return (
    <ExampleGroup style={{ width: '80px' }}>
      <TextArea
        placeholder="Placeholder"
        leadingAddon={{ addon: <FaShieldAlt />, inline: true }}
        trailingAddon={{ addon: <FaUser /> }}
      />
    </ExampleGroup>
  );
}
