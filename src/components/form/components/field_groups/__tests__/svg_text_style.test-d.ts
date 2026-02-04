import { expectTypeOf, test } from 'vitest';
import type { z } from 'zod';

import type { SVGStyledTextUserConfig } from '../../../../svg/index.ts';
import type { svgTextStyleFieldsSchema } from '../svg_text_style.schema.ts';

test('schema output should equal renderer props', () => {
  expectTypeOf<
    z.output<typeof svgTextStyleFieldsSchema>
  >().toEqualTypeOf<SVGStyledTextUserConfig>();
});
