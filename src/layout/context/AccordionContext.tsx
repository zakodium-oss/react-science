import { produce } from 'immer';
import React, {
  createContext,
  ReactNode,
  useContext,
  Reducer,
  useReducer,
} from 'react';

interface AccordionItemState {
  title: string;
  isOpen: boolean;
}

type ActionType<Action, Payload = void> = Payload extends void
  ? { type: Action }
  : { type: Action; payload: Payload };

export interface AccordionState {
  items: Array<AccordionItemState>;
}

type AccordionActions =
  | ActionType<'TOGGLE', string>
  | ActionType<'CLEAR', string>;

type AccordionContext = AccordionState;

const accordionContext = createContext<
  | [
      AccordionContext,
      { clear: (except: string) => void; toggle: (title: string) => void },
    ]
  | null
>(null);

const reducer: Reducer<AccordionState, AccordionActions> = produce(
  (draft, actions) => {
    switch (actions.type) {
      case 'TOGGLE': {
        const item = getItem(actions.payload, draft.items);
        item.isOpen = !item.isOpen;
        return draft;
      }
      case 'CLEAR': {
        const item = getItem(actions.payload, draft.items);

        for (const element of draft.items) {
          element.isOpen = element.title === item.title;
        }

        return draft;
      }
      default: {
        break;
      }
    }
  },
);

export function useAccordionContext(title: string) {
  const context = useContext(accordionContext);

  if (!context) {
    throw new Error('AccordionContext was not found');
  }

  const [state, utils] = context;
  const item = getItem(title, state.items);

  return {
    item,
    utils: {
      clear: () => utils.clear(title),
      toggle: () => utils.toggle(title),
    },
  };
}

export function AccordionProvider(props: {
  children: ReactNode;
  items: Array<AccordionItemState>;
}) {
  const ctx = useReducer(reducer, {
    items: props.items,
  });

  if (!props.items) {
    return null;
  }

  const [state, dispatch] = ctx;

  const utils = {
    clear: (except: string) => dispatch({ type: 'CLEAR', payload: except }),
    toggle: (title: string) => dispatch({ type: 'TOGGLE', payload: title }),
  };

  return (
    <accordionContext.Provider value={[{ items: state.items }, utils]}>
      {props.children}
    </accordionContext.Provider>
  );
}

function getItem(title: string, items: Array<AccordionItemState>) {
  const item = items.find((element) => element.title === title);

  if (!item) {
    throw new Error('Item not found');
  }

  return item;
}
