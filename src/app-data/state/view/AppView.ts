import { GradientScaleName } from '../../../components/index';
import type { MeasurementKind } from '../index';

export interface AppView {
  selectedKind?: MeasurementKind;
  selectedMeasurements: Partial<Record<MeasurementKind, Array<string>>>;
  measurements: Record<string, MeasurementAppView>;
  // TODO: implement this.
  // plot: {
  //   [key in MeasurementKind]: PlotView;
  // };
}

// export interface PlotView {
//   zoom: {
//     x: [number, number];
//     y: [number, number];
//   };
// }

export interface MeasurementAppView {
  color: ColorConfig;
  // TODO: implement this.
  // visible: boolean;
}

type ColorConfig =
  | { kind: 'fixed'; color: string }
  | { kind: 'fixedGradient'; gradient: GradientScaleName };
