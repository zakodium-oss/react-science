import type { MutableRefObject, ReactNode } from 'react';
import { useMemo } from 'react';
import { useFullScreenHandle } from 'react-full-screen';

import { fullscreenContext } from './fullscreen_context.js';

export interface FullscreenProviderProps {
  /**
   * Callback providing the ref which should be passed to the element that can be displayed fullscreen.
   * @param ref
   */
  children: (ref: MutableRefObject<HTMLDivElement | null>) => ReactNode;
  /**
   * Callback which will be called in case toggling results in an error.
   * @param error - The error that happened. Value is not necessarily an instance of `Error` and may even be `undefined`.
   * @param step - Indicates if the error happened when entering or exiting the full screen.
   */
  onToggleError?: (error: unknown, step: 'enter' | 'exit') => void;
}

export function FullScreenProvider(props: FullscreenProviderProps) {
  const { children, onToggleError } = props;

  const handle = useFullScreenHandle();

  const value = useMemo(() => {
    function toggle() {
      const handleToggle = handle.active ? handle.exit : handle.enter;
      function handleError(error: unknown) {
        onToggleError?.(error, handle.active ? 'exit' : 'enter');
      }
      try {
        handleToggle().catch(handleError);
      } catch (error) {
        handleError(error);
      }
    }
    return {
      isFullScreen: handle.active,
      toggle,
    };
  }, [handle, onToggleError]);

  return (
    <fullscreenContext.Provider value={value}>
      {children(handle.node)}
    </fullscreenContext.Provider>
  );
}
