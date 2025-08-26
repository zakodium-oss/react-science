import type { AnyFieldApi } from '@tanstack/react-form';
import { useMemo } from 'react';

export function useErrors(field: AnyFieldApi): string | undefined {
  const fieldName = field.name;
  const errors = field.state.meta.errors.map((error) => {
    if (Array.isArray(error.path)) {
      return { ...error, path: error.path.join('.') };
    }

    return error;
  });

  return useMemo(() => {
    const error = errors.find((error) => error.path === fieldName);
    return error?.message || undefined;
  }, [errors, fieldName]);
}
