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
