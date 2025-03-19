import type { useState } from 'react';
import { createContext, useContext } from 'react';

/**
 * An editable state containing the ID of the next item to flash.
 */
type FlashedRowContextValue = ReturnType<typeof useState<string>>;

export const flashedRowContext = createContext<FlashedRowContextValue | null>(
  null,
);

export function useFlashedRowContext() {
  const context = useContext(flashedRowContext);

  if (!context) {
    throw new Error(
      'useFlashedRowContext must be used within a FlashedRowProvider',
    );
  }

  return context;
}
