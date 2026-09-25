import { useOnOff } from './useOnOff.js';

export function useToggle(
  isInitialOn = false,
): [isOn: boolean, toggle: () => void] {
  const [isOn, , , toggle] = useOnOff(isInitialOn);
  return [isOn, toggle];
}
