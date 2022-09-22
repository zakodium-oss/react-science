import {
  IRColumnPreferences,
  IRPeaksPanel as IRPeaksPanelComponent,
} from '../../src';
import { IRPeak } from '../../src/data/IRPeak';
import measurement from '../data/irMeasurement.json';

export default {
  title: 'Measurements / Panels',
};

const columns: IRColumnPreferences[] = [
  {
    accessorKey: 'wavenumber',
    label: 'Wavenumber [cm-1]',
  },
  {
    accessorKey: 'transmittance',
    visible: true,
    label: 'Transmittance',
    format: (val) => `${(100 * Number(val)).toFixed(2)}%`,
  },
  {
    accessorKey: 'absorbance',
  },
  {
    accessorKey: 'kind',
    visible: false,
    label: 'Kind',
  },
];

export function IRPeaksPanel() {
  const peaks = measurement.peaks as IRPeak[];
  return (
    <IRPeaksPanelComponent
      peaks={peaks}
      preferences={{
        columns,
      }}
    />
  );
}
