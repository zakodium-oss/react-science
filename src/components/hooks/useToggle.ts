import { useOnOff } from './useOnOff';

export function useToggle(
  initialValue = false,
): [isOn: boolean, toggle: () => void] {
  const [isOn, , , toggle] = useOnOff(initialValue);
  return [isOn, toggle];
}
