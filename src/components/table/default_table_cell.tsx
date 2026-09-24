import type { CellContext, RowData } from '@tanstack/react-table';
import { P, match } from 'ts-pattern';

import * as ValueRenderers from '../value-renderers/index.js';

import type { ReactScienceTableFeatures } from './table_features.js';

// TODO: support Date
export function defaultTableCell<TData extends RowData, TValue = unknown>(
  context: CellContext<ReactScienceTableFeatures, TData, TValue>,
) {
  return match(context.getValue())
    .with(P.string, (value) => <ValueRenderers.Text value={value as string} />)
    .with(P.number, (value) => (
      <ValueRenderers.Number value={value as number} />
    ))
    .with(P.boolean, (value) => (
      <ValueRenderers.Boolean value={value as boolean} />
    ))
    .otherwise((value) => <ValueRenderers.Text value={String(value)} />);
}
