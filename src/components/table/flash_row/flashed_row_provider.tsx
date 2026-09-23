import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { FlashedRowContext } from './flashed_row_context.js';

export function FlashedRowProvider(props: { children: ReactNode }) {
  const [value, setValue] = useState<string>();
  const contextValue: ReturnType<typeof useState<string>> = useMemo(
    () => [value, setValue],
    [value],
  );
  return (
    <FlashedRowContext value={contextValue}>{props.children}</FlashedRowContext>
  );
}
