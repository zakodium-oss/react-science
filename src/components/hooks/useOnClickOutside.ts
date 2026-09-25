import type { RefObject } from 'react';
import { useEffect } from 'react';

import { useRootLayoutContext } from '../root-layout/root_layout_context.js';

export function useOnClickOutside<T extends Node = Node>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
) {
  const shadowElement = useRootLayoutContext();

  useEffect(() => {
    if (shadowElement === null) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    shadowElement.addEventListener('mousedown', listener);
    shadowElement.addEventListener('touchstart', listener);

    return () => {
      shadowElement.removeEventListener('mousedown', listener);
      shadowElement.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, shadowElement]);
}
