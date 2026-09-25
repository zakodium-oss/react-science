import { createContext, use, useEffect, useMemo } from 'react';

import type {
  AccordionItemContextValue,
  AccordionItemSetIsOpen,
} from './accordion_context_utils.js';

export type AccordionContextValue = [
  {
    unmountChildren: boolean;
  },
  {
    closeAllExcept: (except: string) => void;
    toggle: (id: string) => void;
    unregister: (id: string) => void;
    register: (id: string, setIsOpen: AccordionItemSetIsOpen) => void;
    change: (id: string, isOpen: boolean) => void;
  },
];
export const AccordionContext = createContext<AccordionContextValue | null>(
  null,
);

export function useAccordionItemContext(
  id: string,
  setIsOpen: AccordionItemSetIsOpen,
): AccordionItemContextValue {
  const context = use(AccordionContext);

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
      controls: {
        closeOthers: () => utils.closeAllExcept(id),
        toggle: () => utils.toggle(id),
        open: () => utils.change(id, true),
        close: () => utils.change(id, false),
      },
    }),
    [id, utils, state.unmountChildren],
  );
}
