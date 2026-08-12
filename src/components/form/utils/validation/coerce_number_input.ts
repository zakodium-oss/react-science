import { z } from 'zod';

export const coerceNumberInput = z.string().transform((value) => {
  const number = Number(value);
  return Number.isNaN(number) ? 0 : number;
});
