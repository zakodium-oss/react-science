import type { Dispatch, SetStateAction } from 'react';

export interface AccordionItemControls {
  closeOthers: () => void;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export interface AccordionItemContextValue {
  unmountChildren: boolean;
  controls: AccordionItemControls;
}

export type AccordionItemSetIsOpen = Dispatch<SetStateAction<boolean>>;

interface AccordionRegisteredItem {
  setIsOpen: AccordionItemSetIsOpen;
}

export function getAccordionRegister() {
  return new Map<string, AccordionRegisteredItem>();
}
