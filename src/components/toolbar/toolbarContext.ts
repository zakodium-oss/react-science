import type { Intent } from '@blueprintjs/core';
import { createContext, use } from 'react';

import type { PopoverInteractionType } from './Toolbar.js';

export interface ToolbarContextValue {
  intent?: Intent;
  vertical?: boolean;
  disabled?: boolean;
  popoverInteractionKind?: PopoverInteractionType;
}

export const ToolbarContext = createContext<ToolbarContextValue | null>(null);

export function useToolbarContext() {
  const ctx = use(ToolbarContext);
  if (!ctx) {
    throw new Error('useToolbarContext must be used within a ToolbarContext');
  }
  return ctx;
}
