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
  lineStroke: string;
  // TODO: implement this.
  // color: ColorConfig;
  // visible: boolean;
}

// type ColorConfig = any;
