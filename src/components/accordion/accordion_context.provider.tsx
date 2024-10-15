import { type ReactNode, useMemo, useReducer } from 'react';

import { accordionContext, type ContextType } from './accordion_context.js';
import { reducer } from './accordion_context.state.js';

export function AccordionProvider(props: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
  });

  const utils = useMemo(
    () => ({
      change: (title: string, isOpen: boolean) => {
        return dispatch({
          type: 'CHANGE_ITEM',
          payload: { isOpen, title },
        });
      },
      clear: (except: string) => {
        return dispatch({ type: 'CLEAR', payload: except });
      },
      toggle: (title: string) => {
        return dispatch({ type: 'TOGGLE', payload: title });
      },
      remove: (title: string) => {
        return dispatch({ type: 'REMOVE_ITEM', payload: title });
      },
      create: (title: string, defaultOpened?: boolean) => {
        const item = { title, isOpen: defaultOpened || false };
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
