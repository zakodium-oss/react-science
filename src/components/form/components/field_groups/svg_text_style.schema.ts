import { z } from 'zod';

import { stringToNumberOptional } from '../../utils/validators.ts';

export const svgTextStyleFieldsSchema = z.object({
  fill: z.string().optional(),
  fontSize: stringToNumberOptional({
    nbrSchema: z.int().min(0),
    parse: (str) => Number.parseInt(str, 10),
  }),
  fontStyle: z.enum(['normal', 'italic']).optional(),
  fontWeight: z.enum(['normal', 'bold']).optional(),
});
