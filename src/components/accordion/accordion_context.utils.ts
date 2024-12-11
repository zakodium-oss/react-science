export interface AccordionItemState {
  title: string;
  isOpen: boolean;
}

export interface AccordionState {
  items: AccordionItemState[];
  unmountChildren: boolean;
}

export function getItem(title: string, items: AccordionItemState[]) {
  return items.find((element) => element.title === title);
}
