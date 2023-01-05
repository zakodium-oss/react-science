import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';
import { FaMeteor, FaCcVisa } from 'react-icons/fa';

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
      <Field name="inputLabel" label="Label" required>
        <Input
          placeholder="Label example"
          value={state}
          onChange={onChange}
          variant="small"
        />
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
      <Field name="inputLabel" label="Label">
        <Input
          placeholder="Label example"
          value={state}
          onChange={onChange}
          variant="small"
        />
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

export function WithHelpMessage() {
  return (
    <ExampleGroup>
      <Input
        leadingAddon={{ addon: <FaCcVisa />, inline: true }}
        placeholder="Error with prefix"
        help="Help message"
      />
      <Input
        leadingAddon={{ addon: <FaCcVisa />, inline: true }}
        placeholder="Error with prefix"
        help="Help message"
        variant="small"
      />
    </ExampleGroup>
  );
}

export function WithErrorMessage() {
  return (
    <ExampleGroup>
      <Input
        leadingAddon={{ addon: <FaCcVisa />, inline: true }}
        placeholder="Error with prefix"
        error="Error message"
      />
      <Input
        leadingAddon={{ addon: <FaCcVisa />, inline: true }}
        placeholder="Error with prefix"
        error="Error message"
        variant="small"
      />
    </ExampleGroup>
  );
}

export function WithValidMessage() {
  return (
    <ExampleContainerAddonGroup>
      <Field label="One label" name="oneLabel">
        <Input placeholder="a" valid help="help message" />
        <Input placeholder="b" valid="valid message" />
      </Field>
      <Field label="One label" name="oneLabel" variant="small">
        <Input placeholder="a" valid help="help message" />
        <Input placeholder="b" valid="valid message" />
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
