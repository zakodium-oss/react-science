import { ChangeEvent, useState } from 'react';

import { Input } from '../../src/components/forms/Input';

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
