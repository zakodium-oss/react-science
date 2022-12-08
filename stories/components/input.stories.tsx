import { ChangeEvent, useState } from 'react';

import { Input, Fields, Field } from '../../src/components';

export default {
  title: 'Forms / Input',
};

export function BasicExample() {
  const [state, setState] = useState('Hello, World!');

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);
  }

  return (
    <Input placeholder="Basic example" value={state} onChange={onChange} />
  );
}

export function LabelExample() {
  const [state, setState] = useState('Hello, World!');

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);
  }

  return (
    <Fields>
      <Field name="inputLabel" label="Label">
        <Input placeholder="Label example" value={state} onChange={onChange} />
      </Field>
    </Fields>
  );
}

export function VariantExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
      <div>
        <Input placeholder="Small variant" variant="small" />
      </div>
      <div>
        <Input placeholder="Default variant" variant="default" />
      </div>
    </div>
  );
}

export function VariantWithLabelExample() {
  const [state, setState] = useState('Hello, World!');

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState(event.target.value);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
      <Fields>
        <Field name="inputLabel" label="Label">
          <Input
            placeholder="Label example"
            value={state}
            onChange={onChange}
            variant="default"
          />
        </Field>
      </Fields>
      <Fields>
        <Field name="inputLabel" label="Label">
          <Input
            placeholder="Label example"
            value={state}
            onChange={onChange}
            variant="small"
          />
        </Field>
      </Fields>
    </div>
  );
}

export function WithTrailingAddonDefaultVariant() {
  return <Input placeholder="Basic example" trailingAddon={<p>€</p>} />;
}

export function WithTrailingAddonSmallVariant() {
  return (
    <Input
      placeholder="Basic example"
      trailingAddon={<p>€</p>}
      variant="small"
    />
  );
}

export function WithTrailingAddonButton() {
  return (
    <Input placeholder="With Button" trailingAddon={<p>Hello, World!</p>} />
  );
}
