import type { GradientScaleName } from '../gradient_select/index.ts';

interface ColorConfigFixed {
  kind: 'fixed';
  color: string;
}

interface ColorConfigGradient {
  kind: 'fixedGradient';
  gradient: GradientScaleName;
}

export type ColorConfig = ColorConfigFixed | ColorConfigGradient;

export function assertColorFixed(
  color: ColorConfig,
): asserts color is ColorConfigFixed {
  if (color.kind !== 'fixed') {
    throw new Error('Only fixed colors are supported');
  }
}

export function assertColorGradient(
  color: ColorConfig,
): asserts color is ColorConfigGradient {
  if (color.kind !== 'fixedGradient') {
    throw new Error('Only fixed colors are supported');
  }
}
