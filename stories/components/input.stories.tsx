/** @jsxImportSource @emotion/react */
import {
  FormGroup,
  type FormGroupProps,
  InputGroup,
  type InputGroupProps,
} from '@blueprintjs/core';
import styled from '@emotion/styled';
import { type ChangeEvent, useState } from 'react';

export default {
  title: 'Forms / Input',
};

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
  type: 'text',
  intent: 'none',
};

Control.argTypes = {
  onChange: { action: 'onChange' },
  leftIcon: {
    control: { type: 'inline-radio' },
    options: [undefined, 'person', 'shield', 'add', 'lightning'],
  },
  type: { control: { type: 'inline-radio' }, options: ['text', 'search'] },
  intent: {
    control: { type: 'inline-radio' },
    options: ['none', 'primary', 'success', 'warning', 'danger'],
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
  label: 'Label',
  inline: false,
  helperText: 'Helper text',
  subLabel: 'Sub label',
};
