import { Intent } from '@blueprintjs/core';
import { createContext, useContext } from 'react';

export interface ToolbarContext {
  intent?: Intent;
  large?: boolean;
  vertical?: boolean;
  disabled?: boolean;
}

export const toolbarContext = createContext<ToolbarContext | null>(null);

export function useToolbarContext() {
  const ctx = useContext(toolbarContext);
  if (!ctx) {
    throw new Error(
      'useToolbarContext must be used within a ToolbarContextProvider',
    );
  }
  return ctx;
}
