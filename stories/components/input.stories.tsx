import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';
import { FaMeteor, FaUser, FaBolt, FaShieldAlt } from 'react-icons/fa';

import { Input, Field, InputProps } from '../../src/components';

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

export function Control(
  props: Omit<
    InputProps,
    'onChange' | 'value' | 'trailingAddon' | 'leadingAddon'
  > & {
    trailing?: boolean | 'inline';
    leading?: boolean | 'inline';
    controlled?: boolean;
  },
) {
  const [state, setState] = useState('Hello, World!');

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);
  }
  const { trailing, leading, controlled, ...otherProps } = props;
  return (
    <ExampleGroup>
      <Input
        value={controlled ? state : undefined}
        onChange={controlled ? onChange : undefined}
        leadingAddon={
          leading
            ? { addon: <FaBolt />, inline: leading === 'inline' }
            : undefined
        }
        trailingAddon={
          trailing
            ? { addon: <FaMeteor />, inline: trailing === 'inline' }
            : undefined
        }
        {...otherProps}
      />
    </ExampleGroup>
  );
}
Control.args = {
  placeholder: 'Control example',
  variant: 'default',
  help: '',
  error: '',
  valid: false,
  clearable: false,
  leading: false,
  trailing: false,
  controlled: true,
};

Control.argTypes = {
  variant: {
    options: ['default', 'small'],
    control: { type: 'radio' },
  },
  valid: {
    options: [false, true, 'valid message'],
    control: { type: 'radio' },
  },
  leading: {
    options: [false, true, 'inline'],
    control: { type: 'radio' },
  },
  trailing: {
    options: [false, true, 'inline'],
    control: { type: 'radio' },
  },
};

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
      <Input
        placeholder="Clearable example"
        value={state}
        onChange={onChange}
        clearable
      />
      <Input
        placeholder="Clearable example"
        value={state}
        onChange={onChange}
        variant="small"
        clearable
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
          trailingAddon={{ addon: <FaBolt /> }}
        />

        <Input
          placeholder="Basic example"
          trailingAddon={{ addon: <FaBolt /> }}
          variant="small"
        />

        <Input
          placeholder="Clearable example"
          trailingAddon={{ addon: <FaBolt /> }}
          clearable
        />
      </ExampleGroup>
      <ExampleGroup>
        <Input
          placeholder="Basic example"
          trailingAddon={{ addon: <FaBolt />, inline: true }}
        />

        <Input
          placeholder="Basic example"
          trailingAddon={{ addon: <FaBolt />, inline: true }}
          variant="small"
        />

        <Input
          placeholder="Clearable example"
          trailingAddon={{ addon: <FaBolt />, inline: true }}
          clearable
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
          leadingAddon={{ addon: <FaShieldAlt /> }}
        />

        <Input
          placeholder="Basic example"
          leadingAddon={{ addon: <FaShieldAlt /> }}
          variant="small"
        />
      </ExampleGroup>
      <ExampleGroup>
        <Input
          placeholder="Basic example"
          leadingAddon={{ addon: <FaShieldAlt />, inline: true }}
        />

        <Input
          placeholder="Basic example"
          leadingAddon={{ addon: <FaShieldAlt />, inline: true }}
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

        <Input
          placeholder="Clearable example"
          leadingAddon={{ addon: <FaMeteor /> }}
          trailingAddon={{ addon: <FaMeteor /> }}
          clearable
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

        <Input
          placeholder="Clearable example"
          leadingAddon={{ addon: <FaMeteor />, inline: true }}
          trailingAddon={{ addon: <FaMeteor />, inline: true }}
          clearable
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
          leadingAddon={{ addon: <FaUser />, inline: true }}
        />
        <Input
          placeholder="b"
          help="help message"
          variant="small"
          leadingAddon={{ addon: <FaUser />, inline: true }}
        />
      </Field>
      <Field label="With valid message" name="oneLabel">
        <Input
          placeholder="a"
          valid="help message"
          leadingAddon={{ addon: <FaUser />, inline: true }}
        />
        <Input
          placeholder="b"
          valid="help message"
          variant="small"
          leadingAddon={{ addon: <FaUser />, inline: true }}
        />
      </Field>
      <Field label="With help message and valid boolean" name="oneLabel">
        <Input
          placeholder="a"
          help="help message"
          valid
          leadingAddon={{ addon: <FaUser />, inline: true }}
        />
        <Input
          placeholder="b"
          help="help message"
          variant="small"
          valid
          leadingAddon={{ addon: <FaUser />, inline: true }}
        />
      </Field>
      <Field label="With error message" name="oneLabel">
        <Input
          placeholder="a"
          error="error message"
          leadingAddon={{ addon: <FaUser />, inline: true }}
        />
        <Input
          placeholder="b"
          error="error message"
          variant="small"
          leadingAddon={{ addon: <FaUser />, inline: true }}
        />
      </Field>
    </ExampleContainerAddonGroup>
  );
}
