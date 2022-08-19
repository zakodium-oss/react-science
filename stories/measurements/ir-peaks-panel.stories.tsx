import { IRPeaksPanel as IRPeaksPanelComponent } from '../../src';
import { IRPeak } from '../../src/components/context/data/DataState';
import measurement from '../data/irMeasurement.json';

export default {
  title: 'Measurements / Panels',
};

export function IRPeaksPanel() {
  const peaks = measurement.peaks as IRPeak[];
  return <IRPeaksPanelComponent peaks={peaks} />;
}
