import { GradientScaleName } from '../../../components/index';
import type { MeasurementKind } from '../index';

export interface AppView {
  selectedKind?: MeasurementKind;
  selectedMeasurements: Partial<Record<MeasurementKind, Array<string>>>;
  measurements: Record<string, MeasurementAppView>;
  plot: Partial<Record<MeasurementKind, PlotView>>;
}

export interface PlotView {
  zoom: Plot2DZoom;
}

export interface Plot2DZoom {
  x: { min: number; max: number };
  y: { min: number; max: number };
}

export interface MeasurementAppView {
  color: ColorConfig;
  visible: boolean;
}

export type ColorConfig =
  | { kind: 'fixed'; color: string }
  | { kind: 'fixedGradient'; gradient: GradientScaleName };
