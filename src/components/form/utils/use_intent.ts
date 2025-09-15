import type { Intent } from '@blueprintjs/core';

export function getIntent(error?: string): Intent | undefined {
  return error !== undefined ? 'danger' : undefined;
}
