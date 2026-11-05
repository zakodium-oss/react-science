import { useState } from 'react';

import type { CapsuleOption } from '../../src/components/index.js';
import { CapsuleGroup } from '../../src/components/index.js';

type Fraction = 'alpha' | 'beta' | 'gamma';

const options: ReadonlyArray<CapsuleOption<Fraction>> = [
  { value: 'alpha', label: 'Alpha', intent: 'primary' },
  { value: 'beta', label: 'Beta', intent: 'success', tooltip: 'Second one' },
  { value: 'gamma', label: 'Gamma', intent: 'danger', disabled: true },
];

export function CapsuleGroupWithAll() {
  const [value, setValue] = useState<Fraction | null>(null);
  return (
    <div>
      <CapsuleGroup
        label="Fraction"
        options={options}
        value={value}
        onChange={setValue}
        allOption={{ label: 'All' }}
      />
      <output data-testid="value">{value ?? 'null'}</output>
    </div>
  );
}

export function CapsuleGroupSingle() {
  const [value, setValue] = useState<Fraction>('alpha');
  const [changeCount, setChangeCount] = useState(0);
  return (
    <div>
      <CapsuleGroup
        options={options}
        value={value}
        onChange={(next) => {
          setValue(next);
          setChangeCount((count) => count + 1);
        }}
      />
      <output data-testid="value">{value}</output>
      <output data-testid="changes">{changeCount}</output>
    </div>
  );
}
