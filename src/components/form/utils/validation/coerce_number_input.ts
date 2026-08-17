import { z } from 'zod';

export function coerceNumberInput(schema = z.number()) {
  return z.codec(z.string(), schema, {
    decode: (value) => {
      const number = Number(value);
      return Number.isNaN(number) ? 0 : number;
    },
    encode: String,
  });
}
