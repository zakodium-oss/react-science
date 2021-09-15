import { useRef, useCallback, useEffect } from 'react';

export interface UseDoubleClickOptions<EventData> {
  onClick?: (data: EventData) => void;
  onDoubleClick?: (data: EventData) => void;
  delay?: number;
}

export function useDoubleClick<EventData>({
  onClick,
  onDoubleClick,
  delay = 250,
}: UseDoubleClickOptions<EventData>) {
  const timeout = useRef<number | null>(null);
  useEffect(() => {
    return () => {
      // Cleanup timeout when the component is unmounted.
      if (timeout.current) {
        window.clearTimeout(timeout.current);
      }
    };
  }, []);
  const handleClick = useCallback(
    (data: EventData) => {
      if (timeout.current === null) {
        // No recent click. Start timer to wait for possible double click.
        timeout.current = window.setTimeout(() => {
          timeout.current = null;
          onClick?.(data);
        }, delay);
      } else {
        // A click occured recently. Trigger double click event and stop timer.
        window.clearTimeout(timeout.current);
        timeout.current = null;
        onDoubleClick?.(data);
      }
    },
    [onClick, onDoubleClick, delay],
  );

  return handleClick;
}
