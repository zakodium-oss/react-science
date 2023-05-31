import { useCallback, useMemo, useState } from 'react';

import { Checkbox } from '../../src/components/index';

export default {
  title: 'Components / Checkbox',
};

export function Simple() {
  return (
    <>
      <Checkbox checked={false} />
      <Checkbox />
      <Checkbox checked />
    </>
  );
}

export function Disabled() {
  return (
    <>
      <Checkbox disabled checked={false} />
      <Checkbox disabled />
      <Checkbox disabled checked />
    </>
  );
}

export function ControlledAndIndeterminate() {
  const [orange, setOrange] = useState<boolean | 'indeterminate'>(false);
  const [apple, setApple] = useState<boolean | 'indeterminate'>(false);
  const [banana, setBanana] = useState<boolean | 'indeterminate'>(false);

  const allChecked = useMemo(() => {
    if (orange && apple && banana) return true;
    if (!orange && !apple && !banana) return false;
    return 'indeterminate';
  }, [apple, banana, orange]);

  const setAllChecked = useCallback((checked: boolean | 'indeterminate') => {
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
        height: '100%',
      }}
    >
      <div>
        <Checkbox
          checked={allChecked}
          label="All checked"
          onChange={setAllChecked}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <Checkbox checked={orange} onChange={setOrange} label="Orange" />
        <Checkbox checked={apple} onChange={setApple} label="Apple" />
        <Checkbox checked={banana} onChange={setBanana} label="Banana" />
      </div>
    </div>
  );
}

export function ControlledIndeterminateAndDisabled() {
  const [orange, setOrange] = useState<boolean | 'indeterminate'>(false);
  const [apple, setApple] = useState<boolean | 'indeterminate'>(false);
  const [banana, setBanana] = useState<boolean | 'indeterminate'>(false);

  const allChecked = useMemo(() => {
    if (orange && apple && banana) return true;
    if (!orange && !apple && !banana) return false;
    return 'indeterminate';
  }, [apple, banana, orange]);

  const setAllChecked = useCallback((checked: boolean | 'indeterminate') => {
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
        height: '100%',
      }}
    >
      <div>
        <Checkbox
          checked={allChecked}
          label="All checked"
          onChange={setAllChecked}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <Checkbox
          disabled
          checked={orange}
          onChange={setOrange}
          label="Orange"
        />
        <Checkbox checked={apple} onChange={setApple} label="Apple" />
        <Checkbox checked={banana} onChange={setBanana} label="Banana" />
      </div>
    </div>
  );
}
