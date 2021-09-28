import { useOnOff } from './useOnOff';

export function useModal(options: {
  defaultOpened?: boolean;
}): [isOpen: boolean, open: () => void, close: () => void] {
  const { defaultOpened = false } = options;
  const [isOpen, open, close] = useOnOff(defaultOpened);
  return [isOpen, open, close];
}
