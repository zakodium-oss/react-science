import { createContext, useContext, useEffect, useMemo } from 'react';

import type {
  AccordionItemSetIsOpen,
  AccordionState,
} from './accordion_context_utils.js';

export type ContextType = [
  AccordionContext,
  {
    closeAllExcept: (except: string) => void;
    toggle: (id: string) => void;
    unregister: (id: string) => void;
    register: (id: string, setIsOpen: AccordionItemSetIsOpen) => void;
    change: (id: string, isOpen: boolean) => void;
  },
];

type AccordionContext = AccordionState;

export const accordionContext = createContext<ContextType | null>(null);

export function useAccordionContext(
  id: string,
  setIsOpen: AccordionItemSetIsOpen,
) {
  const context = useContext(accordionContext);

  if (!context) {
    throw new Error('AccordionContext was not found');
  }

  const [state, utils] = context;

  useEffect(() => {
    utils.register(id, setIsOpen);
    return () => utils.unregister(id);
  }, [id, utils, setIsOpen]);

  return useMemo(
    () => ({
      unmountChildren: state.unmountChildren,
      utils: {
        closeOthers: () => utils.closeAllExcept(id),
        toggle: () => utils.toggle(id),
      },
    }),
    [id, utils, state.unmountChildren],
  );
}
