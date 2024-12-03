import { useId } from 'react';

export function useInputId(
  id: string | null | undefined,
  name: string | null | undefined,
) {
  const reactId = useId();

  // If an id is provided, use it
  // Else if a name is specified, join name with reactId to simplify debug in devtools
  // else use the id from useId()
  return id ?? (name ? `${name}_${reactId}` : reactId);
}
