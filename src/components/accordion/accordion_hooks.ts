import { use, useMemo } from 'react';

import { AccordionContext } from './accordion_context.js';

export interface AccordionControls<T extends string = string> {
  open: (id: T) => void;
  close: (id: T) => void;
  toggle: (id: T) => void;
  closeAllExcept: (except: T) => void;
}

export function useAccordionControls<
  T extends string = string,
>(): AccordionControls<T> {
  const context = use(AccordionContext);

  if (!context) {
    throw new Error('AccordionContext was not found');
  }

  const [, utils] = context;

  return useMemo(
    () => ({
      open: (id: T) => utils.change(id, true),
      close: (id: T) => utils.change(id, false),
      toggle: (id: T) => utils.toggle(id),
      closeAllExcept: (except: T) => utils.closeAllExcept(except),
    }),
    [utils],
  );
}
