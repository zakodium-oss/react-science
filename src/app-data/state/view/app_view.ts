import { type GradientScaleName } from '../../../components/index.js';
import type { MeasurementKind } from '../index.js';

export interface AppView {
  selectedKind?: MeasurementKind;
  selectedMeasurements: Partial<Record<MeasurementKind, string[]>>;
  measurements: Record<string, MeasurementAppView>;
  plot: Partial<Record<MeasurementKind, PlotView>>;
}

export interface PlotView {
  zoom: Plot2DZoom;
  xVariable?: string;
  yVariable?: string;
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
