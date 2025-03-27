import type { ReactNode } from 'react';
import { useMemo, useRef } from 'react';

import { assert } from '../utils/index.js';

import type { AccordionContextValue } from './accordion_context.js';
import { accordionContext } from './accordion_context.js';
import type { AccordionItemSetIsOpen } from './accordion_context_utils.js';
import { getAccordionRegister } from './accordion_context_utils.js';

export interface AccordionProviderProps {
  children: ReactNode;
  unmountChildren?: boolean;
}

export function AccordionProvider(props: AccordionProviderProps) {
  const { unmountChildren = false, children } = props;
  const registerRef = useRef(getAccordionRegister());

  const utils = useMemo<AccordionContextValue[1]>(() => {
    return {
      change: (id: string, isOpen: boolean) => {
        assert(registerRef.current);
        const item = registerRef.current.get(id);
        if (item) {
          item.setIsOpen(isOpen);
        }
      },
      closeAllExcept: (id: string) => {
        assert(registerRef.current);
        for (const [key, item] of registerRef.current.entries()) {
          if (key === id) {
            item.setIsOpen(true);
          } else {
            item.setIsOpen(false);
          }
        }
      },
      toggle: (id: string) => {
        assert(registerRef.current);
        const item = registerRef.current.get(id);
        if (item) {
          item.setIsOpen((prevState) => !prevState);
        }
      },
      unregister: (id: string) => {
        assert(registerRef.current);
        registerRef.current.delete(id);
      },
      register: (id: string, setIsOpen: AccordionItemSetIsOpen) => {
        assert(registerRef.current);
        const item = registerRef.current.get(id);
        if (item !== undefined) {
          throw new Error(
            `Accordion item with title "${id}" already exists. Using non-unique titles can lead to unexpected behavior.`,
          );
        }
        registerRef.current.set(id, {
          setIsOpen,
        });
      },
    };
  }, [registerRef]);

  const contextValue = useMemo<AccordionContextValue>(() => {
    return [
      {
        unmountChildren,
      },
      utils,
    ];
  }, [unmountChildren, utils]);

  return (
    <accordionContext.Provider value={contextValue}>
      {children}
    </accordionContext.Provider>
  );
}
