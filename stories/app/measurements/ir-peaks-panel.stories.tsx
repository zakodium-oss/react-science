import type { IrColumnPreferences } from '../../../src/app/index.js';
import { IrPeaksPanel as IrPeaksPanelComponent } from '../../../src/app/index.js';
import type { IrPeak } from '../../../src/app-data/index.js';
import { irMeasurement } from '../../data/data.js';

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
  const peaks = irMeasurement.peaks as IrPeak[];
  return (
    <IrPeaksPanelComponent
      peaks={peaks}
      preferences={{
        columns,
      }}
    />
  );
}
