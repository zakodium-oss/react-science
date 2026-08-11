import type { CellContext, RowData } from '@tanstack/react-table';

import * as ValueRenderers from '../value-renderers/index.js';

import type { ReactScienceTableFeatures } from './table_features.js';

// TODO: support Date
export function defaultTableCell<TData extends RowData, TValue = unknown>(
  context: CellContext<ReactScienceTableFeatures, TData, TValue>,
) {
  const value = context.getValue();
  if (typeof value === 'string') {
    return <ValueRenderers.Text value={value} />;
  } else if (typeof value === 'number') {
    return <ValueRenderers.Number value={value} />;
  } else if (typeof value === 'boolean') {
    return <ValueRenderers.Boolean value={value} />;
  } else {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return <ValueRenderers.Text value={`${value}`} />;
  }
}
