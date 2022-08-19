import { IRPeaksPanel as IRPeaksPanelComponent } from '../../src';
import { IRPeak } from '../../src/components/context/data/DataState';
import measurements from '../data/measurements.json';

export default {
  title: 'Measurements / Panels',
};

export function IRPeaksPanel() {
  const peaks = measurements.measurements.ir.entries[0].peaks as IRPeak[];
  return <IRPeaksPanelComponent peaks={peaks} />;
}
