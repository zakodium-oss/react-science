import type { IrMeasurement } from '../../src/app-data/index.js';

import irMeasurementRaw from './irMeasurement.json' with { type: 'json' };

export const irMeasurement = irMeasurementRaw as IrMeasurement;
export { default as table } from './table.json' with { type: 'json' };
