import type { AnyFieldApi } from '@tanstack/react-form';
import { useMemo } from 'react';

export function useErrors(field: AnyFieldApi): string | undefined {
  return useMemo(() => {
    const error = field.state.meta.errors.find((e) => e.path[0] === field.name);
    return error?.message || undefined;
  }, [field.name, field.state.meta.errors]);
}
