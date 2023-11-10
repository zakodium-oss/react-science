import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';

import { Input, Field, InputProps, FieldProps } from '../../src/components';

export default {
  title: 'Forms / Input',
};

const ExampleContainerAddonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
`;

const ExampleGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 5px;
`;

export function Control(props: Omit<InputProps, 'value'>) {
  const [state, setState] = useState('Hello, World!');

  const { onChange: onChangeProps, ...otherProps } = props;
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);
    onChangeProps?.(event);
  }

  return (
    <ExampleGroup>
      <Input {...otherProps} value={state} onChange={onChange} />
    </ExampleGroup>
  );
}

Control.args = {
  placeholder: 'Placeholder',
  small: false,
  large: false,
  disabled: false,
  leftIcon: undefined,
  rightIcon: undefined,
  help: '',
  error: '',
  valid: '',
  type: 'text',
};

Control.argTypes = {
  onChange: { action: 'onChange' },
  placeholder: { control: 'text' },
  leftIcon: {
    control: { type: 'inline-radio' },
    options: [undefined, 'person', 'shield', 'add', 'lightning'],
  },
  rightIcon: {
    control: { type: 'inline-radio' },
    options: [undefined, 'person', 'shield', 'add', 'lightning'],
  },
  type: { control: { type: 'inline-radio' }, options: ['text', 'search'] },
};

export function FieldControl(props: Omit<FieldProps, 'value'>) {
  const [state, setState] = useState('Hello, World!');

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);
  }

  return (
    <ExampleGroup>
      <Field {...props}>
        <Input placeholder="Label example" value={state} onChange={onChange} />
      </Field>
    </ExampleGroup>
  );
}
FieldControl.args = {
  required: false,
  small: false,
  large: false,
  labelFor: 'inputLabel',
  label: 'Label',
  inline: false,
};
export function Label() {
  const [state, setState] = useState('Hello, World!');

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);
  }

  return (
    <ExampleGroup>
      <Field labelFor="inputLabel" label="Label" inline>
        <Input placeholder="Label example" value={state} onChange={onChange} />
      </Field>
      <Field labelFor="inputLabel" label="Label" small inline>
        <Input placeholder="Label example" value={state} onChange={onChange} />
      </Field>
    </ExampleGroup>
  );
}

export function WithTrailingAddon() {
  return (
    <ExampleContainerAddonGroup>
      <ExampleGroup>
        <Input placeholder="Basic example" rightIcon="lightning" />

        <Input placeholder="Basic example" rightIcon="lightning" small />
      </ExampleGroup>
      <ExampleGroup>
        <Input placeholder="Basic example" rightIcon="lightning" />

        <Input placeholder="Basic example" rightIcon="lightning" small />
      </ExampleGroup>
    </ExampleContainerAddonGroup>
  );
}

export function WithLeadingAddon() {
  return (
    <ExampleContainerAddonGroup>
      <ExampleGroup>
        <Input placeholder="Basic example" leftIcon="shield" />

        <Input placeholder="Basic example" leftIcon="shield" small />
      </ExampleGroup>
      <ExampleGroup>
        <Input placeholder="Basic example" leftIcon="shield" />

        <Input placeholder="Basic example" leftIcon="shield" small />
      </ExampleGroup>
    </ExampleContainerAddonGroup>
  );
}

export function WithLeadingAndTrailingAddon() {
  return (
    <ExampleContainerAddonGroup>
      <ExampleGroup>
        <Input placeholder="Basic example" leftIcon="add" rightIcon="add" />

        <Input
          placeholder="Basic example"
          leftIcon="add"
          rightIcon="add"
          small
        />
      </ExampleGroup>
      <ExampleGroup>
        <Input placeholder="Basic example" leftIcon="add" rightIcon="add" />

        <Input
          placeholder="Basic example"
          leftIcon="add"
          rightIcon="add"
          small
        />
      </ExampleGroup>
    </ExampleContainerAddonGroup>
  );
}

export function TwoInputWithOneLabel() {
  return (
    <ExampleContainerAddonGroup>
      <Field label="One label" labelFor="oneLabel" inline>
        <ExampleGroup>
          <Input placeholder="a" help="Hello, World!" />
          <Input placeholder="b" />
        </ExampleGroup>
      </Field>
      <Field label="One label" labelFor="oneLabel" small inline>
        <ExampleGroup>
          <Input placeholder="a" />
          <Input placeholder="b" />
        </ExampleGroup>
      </Field>
    </ExampleContainerAddonGroup>
  );
}

export function WithSubtext() {
  return (
    <ExampleContainerAddonGroup>
      <Field label="With help message" labelFor="oneLabel" inline>
        <ExampleGroup>
          <Input placeholder="a" help="help message" small />
          <Input placeholder="b" help="help message" small leftIcon="person" />
        </ExampleGroup>
      </Field>
      <Field label="With valid message" labelFor="oneLabel" inline>
        <ExampleGroup>
          <Input placeholder="a" valid="help message" leftIcon="person" />
          <Input placeholder="b" valid="help message" small leftIcon="person" />
        </ExampleGroup>
      </Field>
      <Field
        label="With help message and valid boolean"
        labelFor="oneLabel"
        inline
      >
        <ExampleGroup>
          <Input placeholder="a" help="help message" valid leftIcon="person" />
          <Input
            placeholder="b"
            help="help message"
            small
            valid
            leftIcon="person"
          />
        </ExampleGroup>
      </Field>
      <Field label="With error message" labelFor="oneLabel" inline>
        <ExampleGroup>
          <Input placeholder="a" error="error message" leftIcon="person" />
          <Input
            placeholder="b"
            error="error message"
            small
            leftIcon="person"
            rightIcon="person"
          />
        </ExampleGroup>
      </Field>
    </ExampleContainerAddonGroup>
  );
}
