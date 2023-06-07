import { Select } from '../../src/components/forms/Select';

export default {
  title: 'Forms / Select',
};

export function OnlyOptions() {
  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
        options={[
          [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
          ],
        ]}
      />
    </div>
  );
}

export function OnlyCategories() {
  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
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
    </div>
  );
}

export function OptionsWithCategories() {
  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
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
    </div>
  );
}

export function DisabledOptions() {
  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
        options={[
          [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana', disabled: true },
            { label: 'Orange', value: 'orange' },
          ],
        ]}
      />
    </div>
  );
}

export function DisabledInCategories() {
  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
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
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
        disabled
        options={[
          [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
          ],
        ]}
      />
    </div>
  );
}
export function WithCustomStyle() {
  return (
    <div style={{ width: '100%', padding: '10px' }}>
      <Select
        options={[
          [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Orange', value: 'orange' },
          ],
        ]}
        style={{ width: '500px' }}
      />
    </div>
  );
}
