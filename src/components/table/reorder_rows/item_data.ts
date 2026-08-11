import type { Row, RowData } from '@tanstack/react-table';
import type { Edge } from '@zakodium/pdnd-esm';

import type { ReactScienceTableFeatures } from '../table_features.js';

const itemKey = Symbol('table-item-data');
export interface ItemData {
  [itemKey]: true;
  instanceId: symbol;
  id: string;
  index: number;
  [key: string]: unknown;
  [key: symbol]: unknown;
}

export function getItemData<RowType extends RowData>(
  row: Row<ReactScienceTableFeatures, RowType>,
  instanceId: symbol,
): ItemData {
  return {
    [itemKey]: true,
    id: row.id,
    index: row.index,
    instanceId,
  };
}

export function isItemData(
  data: Record<string | symbol, unknown>,
): data is ItemData {
  return data[itemKey] === true;
}

export type DraggableItemState =
  | { type: 'idle' }
  | { type: 'preview'; container: HTMLElement }
  | { type: 'dragging' }
  | { type: 'is-over'; closestEdge: Edge | null };
