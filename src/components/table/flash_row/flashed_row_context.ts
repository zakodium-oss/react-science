import type { useState } from 'react';
import { createContext, useContext } from 'react';

/**
 * ID of the item to flash.
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
