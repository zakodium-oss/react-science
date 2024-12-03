import type { ReactNode } from 'react';
import { useMemo, useReducer } from 'react';

import type { ContextType } from './accordion_context.js';
import { accordionContext } from './accordion_context.js';
import { reducer } from './accordion_context.state.js';

export function AccordionProvider(props: {
  children: ReactNode;
  unmountChildren?: boolean;
}) {
  const { unmountChildren = false } = props;
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    unmountChildren,
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
    return [{ items: state.items, unmountChildren }, utils];
  }, [state.items, utils, unmountChildren]);

  return (
    <accordionContext.Provider value={value}>
      {props.children}
    </accordionContext.Provider>
  );
}
