import { z } from 'zod';

import { stringToNumberOptional } from '../../utils/validators.ts';

export const svgTextStyleFieldsSchema = z.object({
  fill: z.string().optional(),
  fontSize: stringToNumberOptional({
    numSchema: z.int().min(1),
    parse: (string_) => Math.trunc(Number(string_)),
  }),
  fontStyle: z.enum(['normal', 'italic']).optional(),
  fontWeight: z.enum(['normal', 'bold']).optional(),
});
