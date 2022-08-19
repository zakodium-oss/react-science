import { IRPeaksPanel as IRPeaksPanelComponent } from '../../src';
import { IRPeak } from '../../src/components/context/data/DataState';
import data from '../data/measurements.json';

export default {
  title: 'Measurements / Panels',
};

export function IRPeaksPanel() {
  // @ts-expect-error bad types?
  const peaks = data.measurements.ir.entries[0].peaks as IRPeak[];
  return <IRPeaksPanelComponent peaks={peaks} />;
}
