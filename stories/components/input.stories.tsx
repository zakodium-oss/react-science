import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';

import { Input, Fields, Field } from '../../src/components';

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
    <Fields>
      <ExampleGroup>
        <Field name="inputLabel" label="Label" required>
          <Input
            placeholder="Label example"
            value={state}
            onChange={onChange}
          />
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
    </Fields>
  );
}

export function Label() {
  const [state, setState] = useState('Hello, World!');

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);
  }

  return (
    <Fields>
      <ExampleGroup>
        <Field name="inputLabel" label="Label">
          <Input
            placeholder="Label example"
            value={state}
            onChange={onChange}
          />
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
    </Fields>
  );
}

export function WithTrailingAddon() {
  return (
    <ExampleContainerAddonGroup>
      <ExampleGroup>
        <Input
          placeholder="Basic example"
          trailingAddon={{ addon: <p>A</p> }}
        />

        <Input
          placeholder="Basic example"
          trailingAddon={{ addon: <p>A</p> }}
          variant="small"
        />
      </ExampleGroup>
      <ExampleGroup>
        <Input
          placeholder="Basic example"
          trailingAddon={{ addon: <p>A</p>, inline: true }}
        />

        <Input
          placeholder="Basic example"
          trailingAddon={{ addon: <p>A</p>, inline: true }}
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
        <Input placeholder="Basic example" leadingAddon={{ addon: <p>A</p> }} />

        <Input
          placeholder="Basic example"
          leadingAddon={{ addon: <p>A</p> }}
          variant="small"
        />
      </ExampleGroup>
      <ExampleGroup>
        <Input
          placeholder="Basic example"
          leadingAddon={{ addon: <p>A</p>, inline: true }}
        />

        <Input
          placeholder="Basic example"
          leadingAddon={{ addon: <p>A</p>, inline: true }}
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
          leadingAddon={{ addon: <p>A</p> }}
          trailingAddon={{ addon: <p>A</p> }}
        />

        <Input
          placeholder="Basic example"
          leadingAddon={{ addon: <p>A</p> }}
          trailingAddon={{ addon: <p>A</p> }}
          variant="small"
        />
      </ExampleGroup>
      <ExampleGroup>
        <Input
          placeholder="Basic example"
          leadingAddon={{ addon: <p>A</p>, inline: true }}
          trailingAddon={{ addon: <p>A</p>, inline: true }}
        />

        <Input
          placeholder="Basic example"
          leadingAddon={{ addon: <p>A</p>, inline: true }}
          trailingAddon={{ addon: <p>A</p>, inline: true }}
          variant="small"
        />
      </ExampleGroup>
    </ExampleContainerAddonGroup>
  );
}
