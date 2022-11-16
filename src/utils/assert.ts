export function assertUnreachable(x: never): never {
  throw new Error(`unreachable: ${String(x)}`);
}

export function assertNotNull<T>(
  value: T | null | undefined,
): asserts value is Exclude<T, null | undefined> {
  if (value === null) {
    throw new Error('unexpected null value');
  }
  if (value === undefined) {
    throw new Error('unexpected undefined value');
  }
}

export function assert(value: unknown, message?: string): asserts value {
  if (!value) {
    throw new Error(`unreachable${message ? `: ${message}` : ''}`);
  }
}
