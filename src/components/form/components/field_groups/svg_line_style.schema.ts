import { z } from 'zod';

export const svgLineStyleFieldsSchema = z.object({
  color: z.string(),
  width: z.coerce.number<string>(),
  style: z.enum(['1', '1 1', '4 1 2']),
});
