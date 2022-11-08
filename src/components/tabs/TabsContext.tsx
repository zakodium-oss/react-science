import { createContext, ReactNode, useContext } from 'react';

import type { TabItem } from './Tabs';

const tabsContext = createContext<TabItem | null | undefined>(null);

export function useTabsContext() {
  const context = useContext(tabsContext);
  if (context === null) {
    throw new Error('TabsContext was not found');
  }

  return context;
}

export function TabsProvider<T extends string = string>(props: {
  children: ReactNode;
  opened?: TabItem<T>;
}) {
  return (
    <tabsContext.Provider value={props.opened}>
      {props.children}
    </tabsContext.Provider>
  );
}
