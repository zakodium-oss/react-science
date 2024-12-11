import type { ReactNode } from 'react';
import { useMemo, useReducer } from 'react';
import { match } from 'ts-pattern';

import type { ContextType } from './accordion_context.js';
import { accordionContext } from './accordion_context.js';
import type {
  AccordionItemState,
  ActionType,
} from './accordion_context.utils.js';
import { getItem } from './accordion_context.utils.js';

interface AccordionProviderProps {
  children: ReactNode;
  unmountChildren?: boolean;
}

export type AccordionActions =
  | ActionType<'CHANGE', { title: string; isOpen: boolean }>
  | ActionType<'CLEAR', string>
  | ActionType<'TOGGLE', string>
  | ActionType<'REMOVE', string>
  | ActionType<'CREATE', AccordionItemState>;

function reducer(
  previous: AccordionItemState[],
  action: AccordionActions,
): AccordionItemState[] {
  return match(action)
    .with({ type: 'CHANGE' }, ({ payload }) => {
      const { title, isOpen } = payload;
      const item = getItem(title, previous);

      if (item) {
        const itemsWithoutChangedItem = previous.filter(
          (element) => element.title !== title,
        );

        return [...itemsWithoutChangedItem, { ...item, isOpen }];
      }

      return previous;
    })
    .with({ type: 'CLEAR' }, ({ payload: except }) => {
      const item = getItem(except, previous);

      if (!item) {
        return [...previous, { isOpen: true, title: except }];
      }

      return previous.map((element) => {
        const newItem: AccordionItemState = {
          ...element,
          isOpen: element.title === item.title,
        };

        return newItem;
      });
    })
    .with({ type: 'TOGGLE' }, ({ payload: title }) => {
      const item = getItem(title, previous);

      if (!item) {
        return [...previous, { title, isOpen: true }];
      }

      const itemsWithoutChangedItem = previous.filter(
        (element) => element.title !== title,
      );

      const newItem: AccordionItemState = {
        ...item,
        isOpen: !item.isOpen,
      };

      return [...itemsWithoutChangedItem, newItem];
    })
    .with({ type: 'REMOVE' }, ({ payload: title }) => {
      return previous.filter((element) => element.title !== title);
    })
    .with({ type: 'CREATE' }, ({ payload }) => {
      return [...previous, payload];
    })
    .otherwise(() => previous);
}

export function AccordionProvider(props: AccordionProviderProps) {
  const { unmountChildren = false, children } = props;
  const [items, dispatch] = useReducer(reducer, []);

  const utils = useMemo<ContextType[1]>(() => {
    return {
      change: (title: string, isOpen: boolean) =>
        dispatch({ type: 'CHANGE', payload: { title, isOpen } }),
      clear: (except: string) => dispatch({ type: 'CLEAR', payload: except }),
      toggle: (title: string) => dispatch({ type: 'TOGGLE', payload: title }),
      remove: (title: string) => dispatch({ type: 'REMOVE', payload: title }),
      create: (title: string, defaultOpened?: boolean) => {
        const item: AccordionItemState = {
          title,
          isOpen: defaultOpened || false,
        };

        dispatch({ type: 'CREATE', payload: item });
        return item;
      },
    };
  }, []);

  const contextValue = useMemo<ContextType>(() => {
    return [
      {
        items,
        unmountChildren,
      },
      utils,
    ];
  }, [items, unmountChildren, utils]);

  return (
    <accordionContext.Provider value={contextValue}>
      {children}
    </accordionContext.Provider>
  );
}
