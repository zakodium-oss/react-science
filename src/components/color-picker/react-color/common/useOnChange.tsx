import { useCallback } from 'react';

export function useOnChange(
  onChange: (event: Event) => void,
): (event: Event) => void {
  return useCallback(
    (event) => {
      onChange(event);

      function handleMouseUp() {
        window.removeEventListener('mousemove', onChange);
        window.removeEventListener('mouseup', handleMouseUp);
      }

      window.addEventListener('mousemove', onChange);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [onChange],
  );
}
