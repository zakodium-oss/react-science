import {
  type IrColumnPreferences,
  IrPeaksPanel as IrPeaksPanelComponent,
} from '../../../src/app/index.js';
import type { IrPeak } from '../../../src/app-data/index.js';
import measurement from '../../data/irMeasurement.json';

export default {
  title: 'Measurements / Panels',
};

const columns: IrColumnPreferences[] = [
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

export function IrPeaksPanel() {
  const peaks = measurement.peaks as IrPeak[];
  return (
    <IrPeaksPanelComponent
      peaks={peaks}
      preferences={{
        columns,
      }}
    />
  );
}
