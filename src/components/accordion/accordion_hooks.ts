import { useContext, useMemo } from 'react';

import { accordionContext } from './accordion_context.js';

export interface UseToggleAccordionResult<T extends string = string> {
  open: (title: T) => void;
  close: (title: T) => void;
  closeAllExcept: (except: T) => void;
}

export function useToggleAccordion<
  T extends string = string,
>(): UseToggleAccordionResult<T> {
  const context = useContext(accordionContext);

  if (!context) {
    throw new Error('AccordionContext was not found');
  }

  const [, utils] = context;

  return useMemo(
    () => ({
      open: (title: T) => utils.change(title, true),
      close: (title: T) => utils.change(title, false),
      closeAllExcept: (except: T) => utils.closeAllExcept(except),
    }),
    [utils],
  );
}
