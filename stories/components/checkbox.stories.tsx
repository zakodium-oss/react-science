import { Checkbox, InputGroup } from '@blueprintjs/core';
import type { ChangeEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';

export default {
  title: 'Forms / Checkbox',
};

export function Simple() {
  return (
    <>
      <Checkbox checked={false} />
      <Checkbox indeterminate checked />
      <Checkbox checked />
    </>
  );
}

export function Disabled() {
  return (
    <>
      <Checkbox disabled checked={false} />
      <Checkbox disabled indeterminate />
      <Checkbox disabled checked />
    </>
  );
}

export function ControlledAndIndeterminate() {
  const [orange, setOrange] = useState<boolean>(false);
  const [apple, setApple] = useState<boolean>(false);
  const [banana, setBanana] = useState<boolean>(false);

  const allChecked = useMemo(() => {
    if (orange && apple && banana) return true;
    if (!orange && !apple && !banana) return false;
    return undefined;
  }, [apple, banana, orange]);

  const setAllChecked = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setOrange(isChecked);
    setApple(isChecked);
    setBanana(isChecked);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <div>
        <Checkbox
          indeterminate={!allChecked && (orange || apple || banana)}
          checked={allChecked}
          label="All checked"
          onChange={setAllChecked}
        />
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Checkbox
          checked={orange}
          onChange={(event) => setOrange(event.target.checked)}
          label="Orange"
        />
        <Checkbox
          checked={apple}
          onChange={(event) => setApple(event.target.checked)}
          label="Apple"
        />
        <Checkbox
          checked={banana}
          onChange={(event) => setBanana(event.target.checked)}
          label="Banana"
        />
      </div>
    </div>
  );
}

export function ControlledIndeterminateAndDisabled() {
  const [orange, setOrange] = useState<boolean>(false);
  const [apple, setApple] = useState<boolean>(false);
  const [banana, setBanana] = useState<boolean>(false);

  const allChecked = useMemo(() => {
    if (orange && apple && banana) return true;
    if (!orange && !apple && !banana) return false;
    return undefined;
  }, [apple, banana, orange]);

  const setAllChecked = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setOrange(isChecked);
    setApple(isChecked);
    setBanana(isChecked);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <div>
        <Checkbox
          indeterminate={!allChecked && (orange || apple || banana)}
          checked={allChecked}
          label="All checked"
          onChange={setAllChecked}
        />
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <Checkbox
          disabled
          checked={orange}
          onChange={(event) => setOrange(event.target.checked)}
          label="Orange"
        />
        <Checkbox
          checked={apple}
          onChange={(event) => setApple(event.target.checked)}
          label="Apple"
        />
        <Checkbox
          checked={banana}
          onChange={(event) => setBanana(event.target.checked)}
          label="Banana"
        />
      </div>
    </div>
  );
}

export function SimpleWithInput() {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        label="Hello, world!"
      />
      <InputGroup />
    </div>
  );
}
