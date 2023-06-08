import { useState } from 'react';

import { Select } from '../../src/components/forms/Select';

export default {
  title: 'Forms / Select',
};

export function OnlyOptions() {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
        value={value}
        onSelect={setValue}
        options={[
          [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
          ],
        ]}
      />
      <p>Value outside component is {value}.</p>
    </div>
  );
}

export function OnlyCategories() {
  const [value, setValue] = useState<string>('apple');
  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
        value={value}
        onSelect={setValue}
        options={[
          [
            {
              label: 'Fruits',
              options: [
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
                { label: 'Orange', value: 'orange' },
              ],
            },
            {
              label: 'Vegetables',
              options: [
                { label: 'Carrot', value: 'carrot' },
                { label: 'Potato', value: 'potato' },
                { label: 'Tomato', value: 'tomato' },
              ],
            },
          ],
        ]}
      />
      <p>Value outside component is {value}.</p>
    </div>
  );
}

export function OptionsWithCategories() {
  const [value, setValue] = useState<string>('apple');

  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
        value={value}
        onSelect={setValue}
        options={[
          [
            {
              label: 'Fruits',
              options: [
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
                { label: 'Orange', value: 'orange' },
              ],
            },
            {
              label: 'Vegetables',
              options: [
                { label: 'Carrot', value: 'carrot' },
                { label: 'Potato', value: 'potato' },
                { label: 'Tomato', value: 'tomato' },
              ],
            },
          ],
          [
            {
              label: 'Pork',
              value: 'pork',
            },
            {
              label: 'Beef',
              value: 'beef',
            },
          ],
        ]}
      />
      <p>Value outside component is {value}.</p>
    </div>
  );
}

export function DisabledOptions() {
  const [value, setValue] = useState<string>('apple');

  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
        value={value}
        onSelect={setValue}
        options={[
          [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana', disabled: true },
            { label: 'Orange', value: 'orange' },
          ],
        ]}
      />
      <p>Value outside component is {value}.</p>
    </div>
  );
}

export function DisabledInCategories() {
  const [value, setValue] = useState<string>('apple');

  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
        value={value}
        onSelect={setValue}
        options={[
          [
            {
              label: 'Fruits',
              options: [
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana', disabled: true },
                { label: 'Orange', value: 'orange' },
              ],
            },
            {
              label: 'Vegetables',
              options: [
                { label: 'Carrot', value: 'carrot' },
                { label: 'Potato', value: 'potato', disabled: true },
                { label: 'Tomato', value: 'tomato' },
              ],
            },
          ],
        ]}
      />
      <p>Value outside component is {value}.</p>
    </div>
  );
}

export function Disabled() {
  const [value, setValue] = useState<string>('apple');

  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
        value={value}
        onSelect={setValue}
        disabled
        options={[
          [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
          ],
        ]}
      />
      <p>Value outside component is {value}.</p>
    </div>
  );
}
export function WithCustomStyle() {
  const [value, setValue] = useState<string>('apple');

  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
        value={value}
        onSelect={setValue}
        options={[
          [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
          ],
        ]}
        style={{ width: '500px' }}
      />
      <p>Value outside component is {value}.</p>
    </div>
  );
}

export function FixedValueNoopHandle() {
  const value = 'apple';
  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
        value={value}
        onSelect={() => {}}
        options={[
          [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
          ],
        ]}
      />
      <p>Value outside component is {value}.</p>
    </div>
  );
}

export function UndefinedValueNoopHandle() {
  const value = undefined;
  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
        value={value}
        onSelect={() => {}}
        options={[
          [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
          ],
        ]}
      />
      <p>Value outside component is {value}.</p>
    </div>
  );
}

export function FixedValueUndefinedHandle() {
  const value = 'apple';
  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
        value={value}
        options={[
          [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
          ],
        ]}
      />
      <p>Value outside component is {value}.</p>
    </div>
  );
}

export function UndefinedValueUndefinedHandle() {
  const value = undefined;
  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
        value={value}
        options={[
          [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
          ],
        ]}
      />
      <p>Value outside component is {value}.</p>
    </div>
  );
}

export function ResetButton() {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
        value={value}
        onSelect={setValue}
        options={[
          [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
          ],
        ]}
      />
      <p>Value outside component is {value}.</p>
      <button type="button" onClick={() => setValue(undefined)}>
        Reset
      </button>
    </div>
  );
}
