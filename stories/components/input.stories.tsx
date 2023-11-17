/** @jsxImportSource @emotion/react */
import {
  FormGroup,
  FormGroupProps,
  Icon,
  InputGroup,
  InputGroupProps,
} from '@blueprintjs/core';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';

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

export function Control(props: Omit<InputGroupProps, 'value'>) {
  const [state, setState] = useState('Hello, World!');

  const { onChange: onChangeProps, ...otherProps } = props;
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);
    onChangeProps?.(event);
  }

  return (
    <ExampleGroup>
      <InputGroup {...otherProps} value={state} onChange={onChange} />
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
  valid: false,
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
  valid: {
    control: { type: 'inline-radio' },
    options: [true, false, 'valid message'],
  },
};

export function FormGroupControl(props: Omit<FormGroupProps, 'value'>) {
  const [state, setState] = useState('Hello, World!');

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);
  }

  return (
    <ExampleGroup>
      <FormGroup {...props}>
        <InputGroup
          placeholder="Label example"
          value={state}
          onChange={onChange}
        />
      </FormGroup>
    </ExampleGroup>
  );
}
FormGroupControl.args = {
  labelInfo: '*',
  labelFor: 'inputLabel',
  label: 'Label',
  inline: false,
};

export function WithTrailingAddon() {
  return (
    <ExampleContainerAddonGroup>
      <ExampleGroup>
        <InputGroup
          placeholder="Basic example"
          rightElement={
            <Icon
              css={css`
                *:has(> &) {
                  height: 100%;
                  width: 30px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                color: #5f6b7c;
              `}
              icon="lightning"
            />
          }
        />

        <InputGroup
          placeholder="Basic example"
          rightElement={
            <Icon
              css={css`
                *:has(> &) {
                  height: 100%;
                  width: 30px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                color: #5f6b7c;
              `}
              icon="lightning"
            />
          }
          small
        />
      </ExampleGroup>
    </ExampleContainerAddonGroup>
  );
}

export function WithLeadingAddon() {
  return (
    <ExampleContainerAddonGroup>
      <ExampleGroup>
        <InputGroup placeholder="Basic example" leftIcon="shield" />

        <InputGroup placeholder="Basic example" leftIcon="shield" small />
      </ExampleGroup>
      <ExampleGroup>
        <InputGroup placeholder="Basic example" leftIcon="shield" />

        <InputGroup placeholder="Basic example" leftIcon="shield" small />
      </ExampleGroup>
    </ExampleContainerAddonGroup>
  );
}

export function WithLeadingAndTrailingAddon() {
  return (
    <ExampleContainerAddonGroup>
      <ExampleGroup>
        <InputGroup
          placeholder="Basic example"
          leftIcon="add"
          rightElement={
            <Icon
              css={css`
                *:has(> &) {
                  height: 100%;
                  width: 30px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                color: #5f6b7c;
              `}
              icon="add"
            />
          }
        />

        <InputGroup
          placeholder="Basic example"
          leftIcon="add"
          rightElement={
            <Icon
              css={css`
                *:has(> &) {
                  height: 100%;
                  width: 30px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                color: #5f6b7c;
              `}
              icon="add"
            />
          }
          small
        />
      </ExampleGroup>
    </ExampleContainerAddonGroup>
  );
}

export function TwoInputWithOneLabel() {
  return (
    <ExampleContainerAddonGroup>
      <FormGroup
        label="One label"
        labelFor="oneLabel"
        inline
        helperText="Hello, World!"
      >
        <ExampleGroup>
          <InputGroup placeholder="a" />
          <InputGroup placeholder="b" />
        </ExampleGroup>
      </FormGroup>
    </ExampleContainerAddonGroup>
  );
}

export function WithSubtext() {
  return (
    <ExampleContainerAddonGroup>
      <FormGroup
        label="With help message"
        labelFor="oneLabel"
        inline
        helperText="help message"
      >
        <ExampleGroup>
          <InputGroup placeholder="a" leftIcon="person" />
          <InputGroup placeholder="b" small leftIcon="person" />
        </ExampleGroup>
      </FormGroup>
      <FormGroup
        label="With valid message"
        labelFor="oneLabel"
        inline
        helperText="help message"
        intent="success"
      >
        <ExampleGroup>
          <InputGroup placeholder="a" leftIcon="person" intent="success" />
          <InputGroup
            placeholder="b"
            small
            leftIcon="person"
            intent="success"
          />
        </ExampleGroup>
      </FormGroup>
      <FormGroup
        label="With help message and valid"
        labelFor="oneLabel"
        inline
        helperText="help message"
      >
        <ExampleGroup>
          <InputGroup placeholder="a" leftIcon="person" intent="success" />
          <InputGroup
            placeholder="b"
            intent="success"
            small
            leftIcon="person"
          />
        </ExampleGroup>
      </FormGroup>
      <FormGroup
        label="With error message"
        labelFor="oneLabel"
        inline
        helperText="error message"
        intent="danger"
      >
        <ExampleGroup>
          <InputGroup placeholder="a" leftIcon="person" intent="danger" />
          <InputGroup placeholder="b" intent="danger" small leftIcon="person" />
        </ExampleGroup>
      </FormGroup>
    </ExampleContainerAddonGroup>
  );
}
