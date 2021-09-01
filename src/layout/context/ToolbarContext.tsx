import React, { createContext, ReactNode, useContext } from 'react';

import { ToolbarOrientation } from '../ToolbarLayout';

const toolbarContext = createContext<ToolbarOrientation | null>(null);

export function useToolbarContext() {
  const context = useContext(toolbarContext);
  if (!context) {
    throw new Error('ToolbarContext was not found');
  }

  return context;
}

export function ToolbarProvider(props: {
  children: ReactNode;
  orientation: ToolbarOrientation;
}) {
  return (
    <toolbarContext.Provider value={props.orientation}>
      {props.children}
    </toolbarContext.Provider>
  );
}
