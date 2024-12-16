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

export type ActionType<Action, Payload = void> = Payload extends void
  ? { type: Action }
  : { type: Action; payload: Payload };

export function removeItem(array: AccordionItemState[], title: string) {
  return array.filter((element) => element.title !== title);
}

export function changeItem(
  array: AccordionItemState[],
  payload: { title: string; isOpen: boolean },
) {
  const { title, isOpen } = payload;
  const item = getItem(title, array);

  if (item) {
    return [...removeItem(array, title), { ...item, isOpen }];
  }

  return array;
}

export function clearItem(array: AccordionItemState[], except: string) {
  const item = getItem(except, array);

  if (!item) {
    return [...array, { isOpen: true, title: except }];
  }

  return array.map((element) => {
    return {
      ...element,
      isOpen: element.title === item.title,
    };
  });
}

export function toggleItem(array: AccordionItemState[], title: string) {
  const item = getItem(title, array);

  if (!item) {
    return [...array, { title, isOpen: true }];
  }

  return [
    ...removeItem(array, title),
    {
      ...item,
      isOpen: !item.isOpen,
    },
  ];
}
