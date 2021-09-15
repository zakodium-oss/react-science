import { Draft, produce } from 'immer';
import React, {
  createContext,
  ReactNode,
  useContext,
  Reducer,
  useReducer,
  useMemo,
  useEffect,
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
  | ActionType<'CLEAR', string>
  | ActionType<'REMOVE_ITEM', string>
  | ActionType<'CREATE_ITEM', { title: string; isOpen: boolean }>;

type ContextType = [
  AccordionContext,
  {
    clear: (except: string) => void;
    toggle: (title: string) => void;
    remove: (title: string) => void;
    create: (title: string) => AccordionItemState;
  },
];

type AccordionContext = AccordionState;

const accordionContext = createContext<ContextType | null>(null);

const reducer: Reducer<AccordionState, AccordionActions> = produce(
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
      default: {
        return draft;
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

  useEffect(() => {
    utils.create(title);
    return () => utils.remove(title);
  }, [title, utils]);

  let item = getItem(title, state.items);

  return useMemo(
    () => ({
      item,
      utils: {
        clear: () => utils.clear(title),
        toggle: () => utils.toggle(title),
        remove: () => utils.remove(title),
        create: () => utils.create(title),
      },
    }),
    [item, title, utils],
  );
}

export function AccordionProvider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
  });

  const utils = useMemo(
    () => ({
      clear: (except: string) => {
        return dispatch({ type: 'CLEAR', payload: except });
      },
      toggle: (title: string) => {
        return dispatch({ type: 'TOGGLE', payload: title });
      },
      remove: (title: string) => {
        return dispatch({ type: 'REMOVE_ITEM', payload: title });
      },
      create: (title: string) => {
        const item = { title, isOpen: false };
        dispatch({ type: 'CREATE_ITEM', payload: item });
        return item;
      },
    }),
    [dispatch],
  );

  const value = useMemo<ContextType>(() => {
    return [{ items: state.items }, utils];
  }, [state.items, utils]);

  return (
    <accordionContext.Provider value={value}>
      {props.children}
    </accordionContext.Provider>
  );
}

function getItem(title: string, items: Array<AccordionItemState>) {
  const item = items.find((element) => element.title === title);
  return item;
}
