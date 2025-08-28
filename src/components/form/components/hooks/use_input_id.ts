import { useId } from 'react';

/**
 * Generate an automatic id if needed, joined with name if truthy
 *
 * @param id
 * @param name
 */
export function useInputId(
  id: string | null | undefined,
  name: string | null | undefined,
) {
  const reactId = useId();

  // If id is defined, keep id as finalId for predictable behavior.
  // If name is defined, join name with reactId to simplify debug in devtools.
  // Else use reactId.
  return id ?? (name ? `${name}_${reactId}` : reactId);
}
