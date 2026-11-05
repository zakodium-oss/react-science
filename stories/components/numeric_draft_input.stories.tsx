import { Button } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { useState } from 'react';

import {
  NumericDraftField,
  NumericDraftInput,
} from '../../src/components/index.js';

export default {
  title: 'Forms / NumericDraftInput',
};

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 280px;
  padding: 16px;
`;

export function Input() {
  const [value, setValue] = useState(0);
  return (
    <Column>
      <NumericDraftInput
        value={value}
        onChange={setValue}
        stepSize={0.1}
        minorStepSize={0.01}
        unit="mL"
      />
      <span>
        Value: {value} — type <code>0.01</code> or <code>-5</code>: the partial
        entries <code>0.</code> and <code>-</code> survive.
      </span>
    </Column>
  );
}

export function Field() {
  const [mass, setMass] = useState(20);
  return (
    <Column>
      <NumericDraftField
        label="Sample mass"
        unit="mg"
        helperText="Between 1 and 100. Blur clamps an entry outside the range."
        value={mass}
        onChange={setMass}
        min={1}
        max={100}
      />
      <span>Value: {mass}</span>
      <Button text="Reset to 25" onClick={() => setMass(25)} />
    </Column>
  );
}

export function Coarse() {
  const [delay, setDelay] = useState(500);
  return (
    <Column>
      <NumericDraftField
        label="Interval"
        unit="ms"
        value={delay}
        onChange={setDelay}
        min={0}
        stepSize={100}
        majorStepSize={1000}
      />
      <span>Value: {delay}</span>
    </Column>
  );
}

export function Disabled() {
  return (
    <Column>
      <NumericDraftField
        label="Locked"
        value={42}
        onChange={() => {
          // Never called: the input is disabled.
        }}
        disabled
      />
    </Column>
  );
}
