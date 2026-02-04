import { z } from 'zod';

const stringToNumberOptional = z.codec(
  z.string().optional(),
  z.int().min(0).optional(),
  {
    encode: (nbr) => (nbr === undefined ? undefined : String(nbr)),
    decode: (str) => {
      if (!str) return undefined;

      const value = Number.parseInt(str, 10);
      if (Number.isNaN(value)) return undefined;

      return value;
    },
  },
);

export const svgTextStyleFieldsSchema = z.object({
  fill: z.string().optional(),
  fontSize: stringToNumberOptional,
  fontStyle: z.enum(['normal', 'italic']).optional(),
  fontWeight: z.enum(['normal', 'bold']).optional(),
});
