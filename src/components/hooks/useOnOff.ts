import { useCallback, useState } from 'react';

export function useOnOff(
  initialValue = false,
): [isOn: boolean, setOn: () => void, setOff: () => void, toggle: () => void] {
  const [isOn, setOnOff] = useState(initialValue);
  const setOn = useCallback(() => setOnOff(true), []);
  const setOff = useCallback(() => setOnOff(false), []);
  const toggle = useCallback(() => setOnOff((isOn) => !isOn), []);
  return [isOn, setOn, setOff, toggle];
}
