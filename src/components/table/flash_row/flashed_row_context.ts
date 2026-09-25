import type { useState } from 'react';
import { createContext, use } from 'react';

/**
 * An editable state containing the ID of the next item to flash.
 */
type FlashedRowContextValue = ReturnType<typeof useState<string>>;

export const FlashedRowContext = createContext<FlashedRowContextValue | null>(
  null,
);

export function useFlashedRowContext() {
  const context = use(FlashedRowContext);

  if (!context) {
    throw new Error(
      'useFlashedRowContext must be used within a FlashedRowProvider',
    );
  }

  return context;
}
