import type { ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';

import type { ContextType } from './accordion_context.js';
import { accordionContext } from './accordion_context.js';
import type { AccordionState } from './accordion_context.utils.js';
import { getItem } from './accordion_context.utils.js';

interface AccordionProviderProps {
  children: ReactNode;
  unmountChildren?: boolean;
}

export function AccordionProvider(props: AccordionProviderProps) {
  const { unmountChildren = false, children } = props;
  const [items, setItems] = useState<AccordionState['items']>([]);

  const change = useCallback(
    (title: string, isOpen: boolean) => {
      const item = getItem(title, items);

      if (item) {
        setItems((oldItems) => [
          ...oldItems.filter((element) => element.title !== title),
          { ...item, isOpen },
        ]);
      }
    },
    [items],
  );

  const clear = useCallback(
    (except: string) => {
      const item = getItem(except, items);

      if (!item) {
        setItems((oldItems) => [...oldItems, { isOpen: true, title: except }]);
        return;
      }

      setItems((oldItems) =>
        oldItems.map((element) => ({
          ...element,
          isOpen: element.title === item.title,
        })),
      );
    },
    [items],
  );

  const toggle = useCallback(
    (title: string) => {
      const item = getItem(title, items);

      if (!item) {
        setItems((oldItems) => [...oldItems, { isOpen: true, title }]);
        return;
      }

      setItems((oldItems) => [
        ...oldItems.filter((element) => element.title !== title),
        { ...item, isOpen: !item.isOpen },
      ]);
    },
    [items],
  );

  const remove = useCallback((title: string) => {
    setItems((oldItems) =>
      oldItems.filter((element) => element.title !== title),
    );
  }, []);

  const create = useCallback((title: string, defaultOpened?: boolean) => {
    const item = { title, isOpen: defaultOpened || false };
    setItems((oldItems) => [...oldItems, item]);
    return item;
  }, []);

  const contextValue = useMemo<ContextType>(() => {
    return [
      {
        items,
        unmountChildren,
      },
      { change, clear, toggle, remove, create },
    ];
  }, [unmountChildren, change, items, clear, toggle, remove, create]);

  return (
    <accordionContext.Provider value={contextValue}>
      {children}
    </accordionContext.Provider>
  );
}
