import type { GradientScaleName } from '../gradient_select/index.ts';

export type ColorConfig =
  | { kind: 'fixed'; color: string }
  | { kind: 'fixedGradient'; gradient: GradientScaleName };

export function assertColorFixed(
  color: ColorConfig,
): asserts color is { kind: 'fixed'; color: string } {
  if (color.kind !== 'fixed') {
    throw new Error('Only fixed colors are supported');
  }
}

export function assertColorGradient(
  color: ColorConfig,
): asserts color is { kind: 'fixedGradient'; gradient: GradientScaleName } {
  if (color.kind !== 'fixed') {
    throw new Error('Only fixed colors are supported');
  }
}
