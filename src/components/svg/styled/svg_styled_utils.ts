import { match } from 'ts-pattern';

export const validStrokePatterns = [
  'solid',
  'dashed',
  'dotted',
  'dashed-dot',
] as const;
export type SVGStyledLineStrokePattern = (typeof validStrokePatterns)[number];

export const validFontWeights = ['normal', 'bold'] as const;
export type SVGStyledFontWeight = (typeof validFontWeights)[number];

export const validFontStyles = ['normal', 'italic'] as const;
export type SVGStyledFontStyle = (typeof validFontStyles)[number];

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
