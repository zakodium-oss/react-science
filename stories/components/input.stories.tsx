import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';
import { FaMeteor, FaCcVisa, FaArrowDown } from 'react-icons/fa';

import { Input, Field } from '../../src/components';

export default {
  title: 'Forms / Input',
};

const ExampleContainerAddonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ExampleGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

export function Basic() {
  const [state, setState] = useState('Hello, World!');

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);
  }

  return (
    <ExampleGroup>
      <Input placeholder="Basic example" value={state} onChange={onChange} />
      <Input
        placeholder="Basic example"
        value={state}
        onChange={onChange}
        variant="small"
      />
    </ExampleGroup>
  );
}

export function Required() {
  const [state, setState] = useState('Hello, World!');

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);
  }

  return (
    <ExampleGroup>
      <Field name="inputLabel" label="Label" required>
        <Input placeholder="Label example" value={state} onChange={onChange} />
      </Field>
      <Field name="inputLabel" label="Label" required variant="small">
        <Input placeholder="Label example" value={state} onChange={onChange} />
      </Field>
    </ExampleGroup>
  );
}

export function Label() {
  const [state, setState] = useState('Hello, World!');

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);
  }

  return (
    <ExampleGroup>
      <Field name="inputLabel" label="Label">
        <Input placeholder="Label example" value={state} onChange={onChange} />
      </Field>
      <Field name="inputLabel" label="Label" variant="small">
        <Input placeholder="Label example" value={state} onChange={onChange} />
      </Field>
    </ExampleGroup>
  );
}

export function WithTrailingAddon() {
  return (
    <ExampleContainerAddonGroup>
      <ExampleGroup>
        <Input
          placeholder="Basic example"
          trailingAddon={{ addon: <FaMeteor /> }}
        />

        <Input
          placeholder="Basic example"
          trailingAddon={{ addon: <FaMeteor /> }}
          variant="small"
        />
      </ExampleGroup>
      <ExampleGroup>
        <Input
          placeholder="Basic example"
          trailingAddon={{ addon: <FaMeteor />, inline: true }}
        />

        <Input
          placeholder="Basic example"
          trailingAddon={{ addon: <FaMeteor />, inline: true }}
          variant="small"
        />
      </ExampleGroup>
    </ExampleContainerAddonGroup>
  );
}

export function WithLeadingAddon() {
  return (
    <ExampleContainerAddonGroup>
      <ExampleGroup>
        <Input
          placeholder="Basic example"
          leadingAddon={{ addon: <FaMeteor /> }}
        />

        <Input
          placeholder="Basic example"
          leadingAddon={{ addon: <FaMeteor /> }}
          variant="small"
        />
      </ExampleGroup>
      <ExampleGroup>
        <Input
          placeholder="Basic example"
          leadingAddon={{ addon: <FaMeteor />, inline: true }}
        />

        <Input
          placeholder="Basic example"
          leadingAddon={{ addon: <FaMeteor />, inline: true }}
          variant="small"
        />
      </ExampleGroup>
    </ExampleContainerAddonGroup>
  );
}

export function WithLeadingAndTrailingAddon() {
  return (
    <ExampleContainerAddonGroup>
      <ExampleGroup>
        <Input
          placeholder="Basic example"
          leadingAddon={{ addon: <FaMeteor /> }}
          trailingAddon={{ addon: <FaMeteor /> }}
        />

        <Input
          placeholder="Basic example"
          leadingAddon={{ addon: <FaMeteor /> }}
          trailingAddon={{ addon: <FaMeteor /> }}
          variant="small"
        />
      </ExampleGroup>
      <ExampleGroup>
        <Input
          placeholder="Basic example"
          leadingAddon={{ addon: <FaMeteor />, inline: true }}
          trailingAddon={{ addon: <FaMeteor />, inline: true }}
        />

        <Input
          placeholder="Basic example"
          leadingAddon={{ addon: <FaMeteor />, inline: true }}
          trailingAddon={{ addon: <FaMeteor />, inline: true }}
          variant="small"
        />
      </ExampleGroup>
    </ExampleContainerAddonGroup>
  );
}

export function TwoInputWithOneLabel() {
  return (
    <ExampleContainerAddonGroup>
      <Field label="One label" name="oneLabel">
        <Input placeholder="a" help="Hello, World!" />
        <Input placeholder="b" />
      </Field>
      <Field label="One label" name="oneLabel" variant="small">
        <Input placeholder="a" />
        <Input placeholder="b" />
      </Field>
    </ExampleContainerAddonGroup>
  );
}

export function WithSpinner() {
  return (
    <ExampleGroup>
      <Input loading />
      <Input loading variant="small" />
    </ExampleGroup>
  );
}

export function WithSubtext() {
  return (
    <ExampleContainerAddonGroup>
      <Field label="With help message" name="oneLabel">
        <Input
          placeholder="a"
          help="help message"
          leadingAddon={{ addon: <FaCcVisa />, inline: true }}
        />
        <Input
          placeholder="b"
          help="help message"
          variant="small"
          leadingAddon={{ addon: <FaCcVisa />, inline: true }}
        />
      </Field>
      <Field label="With valid message" name="oneLabel">
        <Input
          placeholder="a"
          valid="help message"
          leadingAddon={{ addon: <FaCcVisa />, inline: true }}
        />
        <Input
          placeholder="b"
          valid="help message"
          variant="small"
          leadingAddon={{ addon: <FaCcVisa />, inline: true }}
        />
      </Field>
      <Field label="With help message and valid boolean" name="oneLabel">
        <Input
          placeholder="a"
          help="help message"
          valid
          leadingAddon={{ addon: <FaCcVisa />, inline: true }}
        />
        <Input
          placeholder="b"
          help="help message"
          variant="small"
          valid
          leadingAddon={{ addon: <FaCcVisa />, inline: true }}
        />
      </Field>
      <Field label="With error message" name="oneLabel">
        <Input
          placeholder="a"
          error="error message"
          leadingAddon={{ addon: <FaCcVisa />, inline: true }}
        />
        <Input
          placeholder="b"
          error="error message"
          variant="small"
          leadingAddon={{ addon: <FaCcVisa />, inline: true }}
        />
      </Field>
    </ExampleContainerAddonGroup>
  );
}

// CF: https://user-images.githubusercontent.com/4118690/211288659-ee4c5d8d-1d36-47cf-9419-bd2fb2c37866.png
export function ScreenFromAnt() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Field label="Username" name="username">
        <Input error="Username is required" placeholder="Please input" />
      </Field>

      <Field label="Address" name="address">
        <Input
          error="Streep is required"
          leadingAddon={{
            addon: (
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                }}
              >
                Zhejiang <FaArrowDown />
              </span>
            ),
          }}
          placeholder="Input street"
        />
      </Field>

      <Field label="BirthDate" name="birth">
        <Input error="'year' is required" placeholder="Input birth year" />
        <Input error="'month' is required" placeholder="Input birth month" />
      </Field>
    </div>
  );
}
