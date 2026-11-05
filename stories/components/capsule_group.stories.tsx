import styled from '@emotion/styled';
import { useState } from 'react';

import type { CapsuleOption } from '../../src/components/index.js';
import { Capsule, CapsuleGroup } from '../../src/components/index.js';

export default {
  title: 'Components / CapsuleGroup',
};

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

type Correction = 'none' | 'shift' | 'warp';

const corrections: ReadonlyArray<CapsuleOption<Correction>> = [
  {
    value: 'none',
    label: 'None',
    intent: 'warning',
    tooltip: 'Measure the drift but leave the trace untouched',
  },
  {
    value: 'shift',
    label: 'Rigid shift',
    intent: 'primary',
    tooltip: 'Add one constant to every retention time',
  },
  {
    value: 'warp',
    label: 'Anchor warp',
    intent: 'success',
    tooltip: 'Warp the trace through the matched landmark peaks',
  },
];

type Role = 'standard' | 'blank' | 'sample';

const roles: ReadonlyArray<CapsuleOption<Role>> = [
  { value: 'standard', label: 'Standard (3)', intent: 'primary' },
  { value: 'blank', label: 'Blank (1)', intent: 'warning' },
  { value: 'sample', label: 'Sample (12)', intent: 'success' },
];

const intents: ReadonlyArray<CapsuleOption<string>> = [
  { value: 'none', label: 'none', intent: 'none' },
  { value: 'primary', label: 'primary', intent: 'primary' },
  { value: 'success', label: 'success', intent: 'success' },
  { value: 'warning', label: 'warning', intent: 'warning' },
  { value: 'danger', label: 'danger', intent: 'danger' },
];

export function SingleSelect() {
  const [correction, setCorrection] = useState<Correction>('shift');
  return (
    <Column>
      <CapsuleGroup
        label="Correction"
        options={corrections}
        value={correction}
        onChange={setCorrection}
      />
      <span>Selected: {correction}</span>
    </Column>
  );
}

export function WithAllOption() {
  const [role, setRole] = useState<Role | null>(null);
  return (
    <Column>
      <CapsuleGroup
        label="Role"
        options={roles}
        value={role}
        onChange={setRole}
        allOption={{ label: 'All (16)', tooltip: 'List every run' }}
      />
      <span>
        Filter: {role ?? 'all'} — click the active role again to clear it.
      </span>
    </Column>
  );
}

export function Intents() {
  const [intent, setIntent] = useState('primary');
  return (
    <Column>
      <CapsuleGroup
        label="Intent"
        options={intents}
        value={intent}
        onChange={setIntent}
      />
    </Column>
  );
}

export function Disabled() {
  const [role, setRole] = useState<Role>('sample');
  const [blank, setBlank] = useState<Role>('blank');
  return (
    <Column>
      <CapsuleGroup
        label="Whole group disabled"
        options={roles}
        value={role}
        onChange={setRole}
        disabled
      />
      <CapsuleGroup
        label="One option disabled"
        options={roles.map((option) =>
          option.value === 'standard' ? { ...option, disabled: true } : option,
        )}
        value={blank}
        onChange={setBlank}
      />
    </Column>
  );
}

export function Toggles() {
  const [isGridVisible, setIsGridVisible] = useState(true);
  const [isLegendVisible, setIsLegendVisible] = useState(false);
  return (
    <Column>
      <div style={{ display: 'flex', gap: 6 }}>
        <Capsule
          active={isGridVisible}
          intent="primary"
          tooltip="Draw the grid lines"
          onClick={() => setIsGridVisible((isVisible) => !isVisible)}
        >
          Grid
        </Capsule>
        <Capsule
          active={isLegendVisible}
          intent="success"
          tooltip="Show the series legend"
          onClick={() => setIsLegendVisible((isVisible) => !isVisible)}
        >
          Legend
        </Capsule>
      </div>
    </Column>
  );
}
