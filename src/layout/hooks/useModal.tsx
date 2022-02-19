import { useOnOff } from './useOnOff';

export interface UseModalOptions {
  defaultOpened?: boolean;
}

export type UseModalReturn = [
  isOpen: boolean,
  open: () => void,
  close: () => void,
];

export function useModal(options: UseModalOptions = {}): UseModalReturn {
  const { defaultOpened = false } = options;
  const [isOpen, open, close] = useOnOff(defaultOpened);
  return [isOpen, open, close];
}
