import type { Intent } from '@blueprintjs/core';
import { createContext, useContext } from 'react';

import type { PopoverInteractionType } from './Toolbar.js';

export interface ToolbarContext {
  intent?: Intent;
  vertical?: boolean;
  disabled?: boolean;
  popoverInteractionKind?: PopoverInteractionType;
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
