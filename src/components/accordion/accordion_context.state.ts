import type { Draft } from 'immer';
import { produce } from 'immer';
import type { Reducer } from 'react';

type ActionType<Action, Payload = void> = Payload extends void
  ? { type: Action }
  : { type: Action; payload: Payload };

export type AccordionActions =
  | ActionType<'TOGGLE', string>
  | ActionType<'CLEAR', string>
  | ActionType<'REMOVE_ITEM', string>
  | ActionType<'CREATE_ITEM', { title: string; isOpen: boolean }>
  | ActionType<'CHANGE_ITEM', { title: string; isOpen: boolean }>;

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

export const reducer: Reducer<AccordionState, AccordionActions> = produce(
  (draft, actions): Draft<AccordionState> => {
    switch (actions.type) {
      case 'TOGGLE': {
        const item = getItem(actions.payload, draft.items);

        if (!item) {
          draft.items.push({ isOpen: true, title: actions.payload });
          return draft;
        }

        item.isOpen = !item.isOpen;

        return draft;
      }
      case 'CLEAR': {
        const item = getItem(actions.payload, draft.items);

        if (!item) {
          draft.items.push({ isOpen: true, title: actions.payload });
          return draft;
        }

        for (const element of draft.items) {
          element.isOpen = element.title === item.title;
        }

        return draft;
      }
      case 'REMOVE_ITEM': {
        draft.items = draft.items.filter(
          (element) => element.title !== actions.payload,
        );

        return draft;
      }
      case 'CREATE_ITEM': {
        draft.items.push(actions.payload);
        return draft;
      }
      case 'CHANGE_ITEM': {
        const item = getItem(actions.payload.title, draft.items);

        if (item) {
          item.isOpen = actions.payload.isOpen;
        }

        return draft;
      }
      default: {
        return draft;
      }
    }
  },
);
