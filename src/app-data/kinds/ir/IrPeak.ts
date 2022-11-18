export type IrPeakKind = 'S' | 'w' | 'm';

export interface IrPeak {
  wavenumber: number;
  absorbance: number;
  transmittance: number;
  kind: IrPeakKind;
}
