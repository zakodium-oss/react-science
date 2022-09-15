import React, { createContext, ReactNode, useContext } from 'react';

import { TabItem } from '../Tabs';

const tabsContext = createContext<TabItem | undefined>(undefined);

export function useTabsContext() {
  const context = useContext(tabsContext);
  if (!context) {
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
