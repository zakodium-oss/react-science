import { ValueRenderers } from '..';

import { Table } from './Table';
import { IRPeak } from './context/data/IRPeak';

export interface IRPeaksPanelProps {
  peaks: IRPeak[];
}
export function IRPeaksPanel({ peaks }: IRPeaksPanelProps) {
  const Rows = peaks.map(
    ({ wavenumber, transmittance, absorbance, kind }, i) => (
      <Table.Row key={i}>
        <ValueRenderers.Number value={wavenumber} />
        <ValueRenderers.Number value={transmittance} />
        <ValueRenderers.Number value={absorbance} />
        <ValueRenderers.Text value={kind} />
      </Table.Row>
    ),
  );
  return (
    <Table>
      <Table.Header>
        <ValueRenderers.Title value="Wavenumber [cm-1]" />
        <ValueRenderers.Title value="Transmittance" />
        <ValueRenderers.Title value="Absorbance" />
        <ValueRenderers.Title value="Kind" />
      </Table.Header>
      {Rows}
    </Table>
  );
}
