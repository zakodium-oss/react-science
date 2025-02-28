import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';

const itemKey = Symbol('item');
export interface ItemData<T = unknown> {
  [itemKey]: true;
  item: T;
  index: number;
}

export function getItemData<T>({
  item,
  index,
}: {
  item: T;
  index: number;
}): ItemData<T> {
  return {
    [itemKey]: true,
    item,
    index,
  };
}

export function isItemData<TData>(
  data: Record<string | symbol, unknown>,
): data is ItemData<TData> {
  return data[itemKey] === true;
}

export type ItemState =
  | { type: 'idle' }
  | { type: 'preview'; container: HTMLElement }
  | { type: 'dragging' }
  | { type: 'is-over'; closestEdge: Edge | null };
