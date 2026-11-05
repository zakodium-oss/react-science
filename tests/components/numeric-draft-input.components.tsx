import { useState } from 'react';

import { NumericDraftField } from '../../src/components/index.js';

export function NumericDraftFieldHarness() {
  const [value, setValue] = useState(0);
  return (
    <div>
      <NumericDraftField
        label="Mass"
        unit="mg"
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        minorStepSize={0.01}
      />
      <output data-testid="value">{value}</output>
      <button type="button" onClick={() => setValue(25)}>
        Reset
      </button>
    </div>
  );
}
