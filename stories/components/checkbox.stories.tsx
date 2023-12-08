import { Checkbox, InputGroup } from '@blueprintjs/core';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

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

  const setAllChecked = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setOrange(checked);
    setApple(checked);
    setBanana(checked);
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
          onChange={(e) => setOrange(e.target.checked)}
          label="Orange"
        />
        <Checkbox
          checked={apple}
          onChange={(e) => setApple(e.target.checked)}
          label="Apple"
        />
        <Checkbox
          checked={banana}
          onChange={(e) => setBanana(e.target.checked)}
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

  const setAllChecked = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setOrange(checked);
    setApple(checked);
    setBanana(checked);
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
          onChange={(e) => setOrange(e.target.checked)}
          label="Orange"
        />
        <Checkbox
          checked={apple}
          onChange={(e) => setApple(e.target.checked)}
          label="Apple"
        />
        <Checkbox
          checked={banana}
          onChange={(e) => setBanana(e.target.checked)}
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
        onChange={(e) => setChecked(e.target.checked)}
        label="Hello, world!"
      />
      <InputGroup />
    </div>
  );
}
