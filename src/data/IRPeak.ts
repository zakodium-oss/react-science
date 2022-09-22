export type IRPeakKind = 'S' | 'w' | 'm';

export interface IRPeak {
  wavenumber: number;
  absorbance: number;
  transmittance: number;
  kind: IRPeakKind;
}
