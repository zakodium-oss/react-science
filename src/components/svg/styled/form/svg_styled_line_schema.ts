import { z } from 'zod';

import { validStrokePatterns } from '../svg_styled_utils.js';

export const svgStyledLineSchema = z.object({
  stroke: z.string().optional(),
  strokeOpacity: z.number().gte(0).lte(1).optional(),
  strokeWidth: z.number().gte(0).optional(),
  strokeDasharray: z.enum(validStrokePatterns).optional(),
});
