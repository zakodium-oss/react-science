import { useState, useCallback } from 'react';

export function useOnOff(
  initialValue = false,
): [boolean, () => void, () => void, () => void] {
  const [isOn, setOnOff] = useState(initialValue);
  const setOn = useCallback(() => setOnOff(true), []);
  const setOff = useCallback(() => setOnOff(false), []);
  const toggle = useCallback(() => setOnOff(!isOn), [isOn]);
  return [isOn, setOn, setOff, toggle];
}
