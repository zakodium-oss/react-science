import type { Intent } from '@blueprintjs/core';

export function useIntent(error?: string): Intent | undefined {
  return error !== undefined ? 'danger' : undefined;
}
