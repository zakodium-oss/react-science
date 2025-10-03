import { z } from 'zod';

import { validFontStyles, validFontWeights } from '../svg_styled_utils.js';

export const svgStyledTextSchema = z.object({
  fill: z.string().optional(),
  fontSize: z.number().gte(0).optional(),
  fontWeight: z.enum(validFontWeights).optional(),
  fontStyle: z.enum(validFontStyles).optional(),
});
