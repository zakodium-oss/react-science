import { z } from 'zod';

export const svgTextStyleFieldsSchema = z.object({
  fill: z.string(),
  fontSize: z.coerce.number<string>(),
  fontStyle: z.enum(['normal', 'italic']),
  fontWeight: z.enum(['normal', 'bold']),
});
