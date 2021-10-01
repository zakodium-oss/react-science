import React, { createContext, ReactNode, useContext } from 'react';

import { TabItem } from '../Tabs';

const tabsContext = createContext<TabItem | null>(null);

export function useTabsContext() {
  const context = useContext(tabsContext);
  if (!context) {
    throw new Error('TabsContext was not found');
  }

  return context;
}

export function TabsProvider(props: { children: ReactNode; opened: TabItem }) {
  return (
    <tabsContext.Provider value={props.opened}>
      {props.children}
    </tabsContext.Provider>
  );
}
