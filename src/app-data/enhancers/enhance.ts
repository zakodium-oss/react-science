import type { Measurements } from '../index';
import { MeasurementBase } from '../state/index';

export type Enhancer<T extends MeasurementBase> = (data: T) => void;

export type Enhancers = {
  [mKind in keyof Measurements]: Array<
    Enhancer<Measurements[mKind]['entries'][number]>
  >;
};

export function enhance(
  measurements: Partial<Measurements>,
  enhancers: Partial<Enhancers>,
) {
  for (const [kind, kindEnhancers] of Object.entries(enhancers)) {
    const kindMeasurements = measurements[kind as keyof Measurements];
    if (kindMeasurements) {
      for (const measurement of kindMeasurements.entries) {
        for (const enhancer of kindEnhancers) {
          enhancer(measurement);
        }
      }
    }
  }
}
