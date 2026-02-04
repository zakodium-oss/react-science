import { z } from 'zod';

import { SVGStyledLineStrokePattern } from '../../../svg/index.js';
import { stringToNumberOptional } from '../../utils/validators.ts';

export const svgLineStyleFieldsSchema = z.object({
  stroke: z
    .string()
    .trim()
    .regex(/^#[0-9a-fA-F]{6}$/, {
      message: 'Color must be hexadecimal and should not contain alpha',
    })
    .optional(),
  strokeOpacity: stringToNumberOptional({
    nbrSchema: z.number().min(0).max(1),
  }),
  strokeWidth: stringToNumberOptional(),
  strokeDasharray: z.enum(SVGStyledLineStrokePattern).optional(),
});
