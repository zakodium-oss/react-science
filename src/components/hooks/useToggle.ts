import { useOnOff } from './useOnOff.js';

export function useToggle(
  initialValue = false,
): [isOn: boolean, toggle: () => void] {
  const [isOn, , , toggle] = useOnOff(initialValue);
  return [isOn, toggle];
}
