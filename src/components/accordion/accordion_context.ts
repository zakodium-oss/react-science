import { createContext, useContext, useEffect, useMemo } from 'react';

import type {
  AccordionItemState,
  AccordionState,
} from './accordion_context.utils.js';
import { getItem } from './accordion_context.utils.js';

export type ContextType = [
  AccordionContext,
  {
    clear: (except: string) => void;
    toggle: (title: string) => void;
    remove: (title: string) => void;
    create: (title: string, defaultOpened?: boolean) => AccordionItemState;
    change: (title: string, isOpen: boolean) => void;
  },
];

type AccordionContext = AccordionState;

export const accordionContext = createContext<ContextType | null>(null);

export function useToggleAccordion() {
  const context = useContext(accordionContext);

  if (!context) {
    throw new Error('AccordionContext was not found');
  }

  const [, utils] = context;

  return useMemo(() => {
    return {
      open: (title: string) => utils.change(title, true),
      close: (title: string) => utils.change(title, false),
    };
  }, [utils]);
}

export function useAccordionContext(title: string, defaultOpened?: boolean) {
  const context = useContext(accordionContext);

  if (!context) {
    throw new Error('AccordionContext was not found');
  }

  const [state, utils] = context;

  useEffect(() => {
    utils.create(title, defaultOpened);
    return () => utils.remove(title);
  }, [defaultOpened, title, utils]);

  const item = getItem(title, state.items);

  return useMemo(
    () => ({
      item,
      unmountChildren: state.unmountChildren,
      utils: {
        clear: () => utils.clear(title),
        toggle: () => utils.toggle(title),
        remove: () => utils.remove(title),
        create: (defaultOpened?: boolean) => utils.create(title, defaultOpened),
      },
    }),
    [item, title, utils, state.unmountChildren],
  );
}
