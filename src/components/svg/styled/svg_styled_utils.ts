import { match } from 'ts-pattern';

import type { SVGStyledLineStrokePattern } from './svg_styled_types.js';

export function computeStrokeDasharray(
  pattern: SVGStyledLineStrokePattern,
  width: number,
): string {
  return match(pattern)
    .with('solid', () => '')
    .with('dashed', () => `${4 * width} ${4 * width}`)
    .with('dotted', () => `${width} ${width}`)
    .with('dashed-dot', () => `${4 * width} ${width} ${width} ${width}`)
    .exhaustive();
}
