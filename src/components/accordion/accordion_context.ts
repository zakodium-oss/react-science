import { createContext, useContext, useEffect, useMemo } from 'react';

import type {
  AccordionItemSetIsOpen,
  AccordionState,
} from './accordion_context_utils.js';

export type ContextType = [
  AccordionContext,
  {
    closeAllExcept: (except: string) => void;
    toggle: (title: string) => void;
    unregister: (title: string) => void;
    register: (title: string, setIsOpen: AccordionItemSetIsOpen) => void;
    change: (title: string, isOpen: boolean) => void;
  },
];

type AccordionContext = AccordionState;

export const accordionContext = createContext<ContextType | null>(null);

export function useAccordionContext(
  title: string,
  setIsOpen: AccordionItemSetIsOpen,
) {
  const context = useContext(accordionContext);

  if (!context) {
    throw new Error('AccordionContext was not found');
  }

  const [state, utils] = context;

  useEffect(() => {
    utils.register(title, setIsOpen);
    return () => utils.unregister(title);
  }, [title, utils, setIsOpen]);

  return useMemo(
    () => ({
      unmountChildren: state.unmountChildren,
      utils: {
        closeOthers: () => utils.closeAllExcept(title),
        toggle: () => utils.toggle(title),
      },
    }),
    [title, utils, state.unmountChildren],
  );
}
