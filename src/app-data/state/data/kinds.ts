import type { MeasurementKind } from './AppData';

export const kindLabels: Record<MeasurementKind, string> = {
  ir: 'IR',
  iv: 'IV',
  raman: 'Raman',
  uv: 'UV',
  uvvis: 'UV-VIS',
  mass: 'Mass',
  gclc: 'GC/LC',
  gclcms: 'GC/LC MS',
  nmr: 'NMR',
  other: 'Other',
};

export const measurementKinds = Object.keys(kindLabels) as MeasurementKind[];
