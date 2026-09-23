import { useCallback, useEffect, useRef } from 'react';

export interface UseDoubleClickOptions<EventData> {
  onClick: (data: EventData) => void;
  onDoubleClick: (data: EventData) => void;
  delay?: number;
}

export function useDoubleClick<EventData>({
  onClick,
  onDoubleClick,
  delay = 250,
}: UseDoubleClickOptions<EventData>) {
  const timeoutRef = useRef<number | null>(null);
  useEffect(() => {
    return () => {
      // Cleanup timeout when the component is unmounted.
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  const handleClick = useCallback(
    (data: EventData) => {
      if (timeoutRef.current === null) {
        // No recent click. Start timer to wait for possible double click.
        timeoutRef.current = window.setTimeout(() => {
          timeoutRef.current = null;
          onClick?.(data);
        }, delay);
      } else {
        // A click occured recently. Trigger double click event and stop timer.
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        onDoubleClick?.(data);
      }
    },
    [onClick, onDoubleClick, delay],
  );

  return handleClick;
}
