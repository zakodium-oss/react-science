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
        <Input placeholder="Basic example" trailingAddon={<p>€</p>} />

        <Input
          placeholder="Basic example"
          trailingAddon={<p>€</p>}
          variant="small"
        />
      </ExampleGroup>
      <ExampleGroup>
        <Input placeholder="Basic example" trailingInlineAddon={<p>€</p>} />

        <Input
          placeholder="Basic example"
          trailingInlineAddon={<p>€</p>}
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
        <Input placeholder="Basic example" leadingAddon={<p>€</p>} />

        <Input
          placeholder="Basic example"
          leadingAddon={<p>€</p>}
          variant="small"
        />
      </ExampleGroup>
      <ExampleGroup>
        <Input placeholder="Basic example" leadingInlineAddon={<p>€</p>} />

        <Input
          placeholder="Basic example"
          leadingInlineAddon={<p>€</p>}
          variant="small"
        />
      </ExampleGroup>
    </ExampleContainerAddonGroup>
  );
}

export function WithLeadingAndTrailingAddon() {
  return (
    <ExampleGroup>
      <Input
        placeholder="Basic example"
        leadingAddon={<p>€</p>}
        trailingAddon={<p>€</p>}
      />

      <Input
        placeholder="Basic example"
        leadingAddon={<p>€</p>}
        trailingAddon={<p>€</p>}
        variant="small"
      />
    </ExampleGroup>
  );
}
