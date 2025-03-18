import type { ReactNode } from 'react';
import { useState } from 'react';

import { flashedRowContext } from './flashed_row_context.js';

export function FlashedRowProvider(props: { children: ReactNode }) {
  const value = useState<string>();
  return (
    <flashedRowContext.Provider value={value}>
      {props.children}
    </flashedRowContext.Provider>
  );
}
