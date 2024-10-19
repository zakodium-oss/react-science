import * as scaleChromatic from 'd3-scale-chromatic';

export type GradientScaleName =
  | 'turbo'
  | 'viridis'
  | 'inferno'
  | 'magma'
  | 'plasma';

export const fixedGradientScales: Record<
  GradientScaleName,
  (t: number) => string
> = {
  turbo: scaleChromatic.interpolateTurbo,
  viridis: scaleChromatic.interpolateViridis,
  inferno: scaleChromatic.interpolateInferno,
  magma: scaleChromatic.interpolateMagma,
  plasma: scaleChromatic.interpolatePlasma,
};
