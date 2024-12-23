import type { ReactNode } from 'react';
import { useMemo, useReducer } from 'react';
import { match } from 'ts-pattern';

import type { ContextType } from './accordion_context.js';
import { accordionContext } from './accordion_context.js';
import type {
  AccordionItemState,
  ActionType,
} from './accordion_context.utils.js';
import {
  changeItem,
  clearItem,
  removeItem,
  toggleItem,
} from './accordion_context.utils.js';

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
      return changeItem(previous, payload);
    })
    .with({ type: 'CLEAR' }, ({ payload }) => {
      return clearItem(previous, payload);
    })
    .with({ type: 'TOGGLE' }, ({ payload }) => {
      return toggleItem(previous, payload);
    })
    .with({ type: 'REMOVE' }, ({ payload }) => {
      return removeItem(previous, payload);
    })
    .with({ type: 'CREATE' }, ({ payload }) => {
      return [...previous, payload];
    })
    .exhaustive();
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
