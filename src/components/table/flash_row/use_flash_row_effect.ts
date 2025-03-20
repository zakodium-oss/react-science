import { Colors } from '@blueprintjs/core';
import type { RefObject } from 'react';
import { useEffect } from 'react';

import { useFlashedRowContext } from './flashed_row_context.js';

export function useFlashRowEffect(
  id: string,
  tableRowRef: RefObject<HTMLTableRowElement>,
) {
  const [flashedItemId, setFlashedItemId] = useFlashedRowContext();
  useEffect(() => {
    if (flashedItemId === id && tableRowRef.current) {
      triggerPostFlash(tableRowRef.current);
      // In a virtualized table, prevent the flash from happening again
      // when the component remounts
      setFlashedItemId(undefined);
    }
  }, [flashedItemId, id, setFlashedItemId, tableRowRef]);
}

function triggerPostFlash(element: HTMLElement) {
  element.animate(
    [{ backgroundColor: Colors.BLUE5, opacity: 0.5 }, { opacity: 0.5 }],
    {
      duration: 250,
      iterations: 1,
    },
  );
}
