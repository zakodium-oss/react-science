import { z } from 'zod';

import { SVGStyledLineStrokePattern } from '../../../svg/index.ts';

export const svgLineStyleFieldsSchema = z.object({
  stroke: z
    .string()
    .trim()
    .regex(/^#[0-9a-fA-F]{6}$/, {
      message: 'Color must be hexadecimal and should not contains alpha',
    }),
  strokeOpacity: z.coerce.number<string>().min(0).max(1),
  strokeWidth: z.coerce.number<string>(),
  strokeDasharray: z.enum(SVGStyledLineStrokePattern),
});
