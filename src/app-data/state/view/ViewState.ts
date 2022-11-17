import { GradientScaleName } from '../../../components/index';
import type { MeasurementKind } from '../index';

export interface ViewState {
  selectedKind?: MeasurementKind;
  selectedMeasurements: Partial<Record<MeasurementKind, Array<string>>>;
  measurements: Record<string, MeasurementViewState>;
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

export interface MeasurementViewState {
  color: ColorConfig;
  // TODO: implement this.
  // visible: boolean;
}

type ColorConfig =
  | { kind: 'fixed'; color: string }
  | { kind: 'fixedGradient'; gradient: GradientScaleName };
