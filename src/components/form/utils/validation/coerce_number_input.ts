import { z } from 'zod';

export function coerceNumberInput(schema = z.number()) {
  return z
    .string()
    .transform((value) => {
      const number = Number(value);
      return Number.isNaN(number) ? 0 : number;
    })
    .pipe(schema);
}
