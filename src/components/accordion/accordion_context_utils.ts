import type { Dispatch, SetStateAction } from 'react';

export interface AccordionItemState {
  title: string;
  onChange: AccordionItemSetIsOpen;
}

export interface AccordionState {
  unmountChildren: boolean;
}

export type AccordionItemSetIsOpen = Dispatch<
  SetStateAction<boolean | undefined>
>;

interface AccordionRegisteredItem {
  setIsOpen: AccordionItemSetIsOpen;
}

export function getAccordionRegister() {
  return new Map<string, AccordionRegisteredItem>();
}
