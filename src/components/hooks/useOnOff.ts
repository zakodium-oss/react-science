import { useCallback, useState } from 'react';

export function useOnOff(
  isInitialOn = false,
): [isOn: boolean, setOn: () => void, setOff: () => void, toggle: () => void] {
  const [isOn, setIsOn] = useState(isInitialOn);
  const setOn = useCallback(() => setIsOn(true), []);
  const setOff = useCallback(() => setIsOn(false), []);
  const toggle = useCallback(() => setIsOn((isOn) => !isOn), []);
  return [isOn, setOn, setOff, toggle];
}
