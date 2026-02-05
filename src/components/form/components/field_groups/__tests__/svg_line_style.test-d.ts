import { expectTypeOf, test } from 'vitest';
import type { z } from 'zod';

import type { SVGStyledLineUserConfig } from '../../../../svg/index.ts';
import type { svgLineStyleFieldsSchema } from '../svg_line_style.schema.ts';

test('schema output should equal renderer props', () => {
  expectTypeOf<
    z.output<typeof svgLineStyleFieldsSchema>
  >().toEqualTypeOf<SVGStyledLineUserConfig>();
});
