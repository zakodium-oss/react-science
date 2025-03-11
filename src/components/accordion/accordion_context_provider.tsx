import type { ReactNode } from 'react';
import { useMemo, useRef } from 'react';

import { assert } from '../utils/index.js';

import type { ContextType } from './accordion_context.js';
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

  const utils = useMemo<ContextType[1]>(() => {
    return {
      change: (title: string, isOpen: boolean) => {
        assert(registerRef.current);
        const item = registerRef.current.get(title);
        if (item) {
          item.setIsOpen(isOpen);
        }
      },
      closeAllExcept: (title: string) => {
        assert(registerRef.current);
        for (const [key, item] of registerRef.current.entries()) {
          if (key === title) {
            item.setIsOpen(true);
          } else {
            item.setIsOpen(false);
          }
        }
      },
      toggle: (title: string) => {
        assert(registerRef.current);
        const item = registerRef.current.get(title);
        if (item) {
          item.setIsOpen((prevState) => !prevState);
        }
      },
      unregister: (title: string) => {
        assert(registerRef.current);
        registerRef.current.delete(title);
      },
      register: (title: string, setIsOpen: AccordionItemSetIsOpen) => {
        assert(registerRef.current);
        const item = registerRef.current.get(title);
        if (item !== undefined) {
          throw new Error(
            `Accordion item with title "${title}" already exists. Using non-unique titles can lead to unexpected behavior.`,
          );
        }
        registerRef.current.set(title, {
          setIsOpen,
        });
      },
    };
  }, [registerRef]);

  const contextValue = useMemo<ContextType>(() => {
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
