import { MenuItem } from '@blueprintjs/core';
import { ItemRenderer } from '@blueprintjs/select';
import { useState } from 'react';

type FilterType<SourceType, Type> = Pick<
  SourceType,
  {
    [K in keyof SourceType]: SourceType[K] extends Type ? K : never;
  }[keyof SourceType]
>;

interface BaseOptions<T> {
  itemLabelKey: keyof FilterType<T, string>;
  defaultSelectedItem?: T;
}

interface RenderOptions<T> {
  itemLabelMap: (item: T) => string;
  defaultSelectedItem?: T;
}

type SelectOptions<T> = BaseOptions<T> | RenderOptions<T>;

function isAccessLabelByKey<T>(
  options: SelectOptions<T>,
): options is BaseOptions<T> {
  return 'itemLabelKey' in options;
}

function getLabel<T>(item: T, options: SelectOptions<T>) {
  const isAccessLByLabelKey = isAccessLabelByKey(options);

  if (!item || (isAccessLByLabelKey && !options.itemLabelKey)) {
    return null;
  }

  if (isAccessLByLabelKey) {
    return item[options.itemLabelKey] as string;
  }

  return options.itemLabelMap(item);
}

export function useSelect<T>(options: SelectOptions<T>) {
  const { defaultSelectedItem = null } = options;

  const [value, setValue] = useState<T | null>(defaultSelectedItem);
  const itemRenderer = getItemRenderer(value as T, options);
  const onItemSelect = setValue;
  const popoverProps = {
    onOpened: (node: HTMLElement) => {
      const firstUl = node.querySelector('ul');
      if (firstUl) {
        firstUl.tabIndex = 0;
        firstUl.focus();
      }
    },
  };
  const popoverTargetProps = {
    style: { display: 'inline-block' },
  };
  const itemPredicate = (query: string, item: T) => {
    const label = getLabel(item, options);
    if (!label) return false;
    return label.toLowerCase().includes(query.toLowerCase());
  };
  const itemListPredicate = (query: string, items: T[]) => {
    return items.filter((item) => {
      const label = getLabel(item, options);
      if (!label) return false;
      return label.toLowerCase().includes(query.toLowerCase());
    });
  };
  return {
    value,
    setValue,
    itemRenderer,
    onItemSelect,
    popoverProps,
    popoverTargetProps,
    itemPredicate,
    itemListPredicate,
  };
}

function getItemRenderer<T>(value: T, options: SelectOptions<T>) {
  const selectedLabel = getLabel(value, options);

  const render: ItemRenderer<T> = (
    item,
    { handleClick, handleFocus, modifiers, index },
  ) => {
    const label = getLabel(item, options);
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        selected={selectedLabel === label}
        key={index}
        onClick={handleClick}
        onFocus={handleFocus}
        roleStructure="listoption"
        text={label}
      />
    );
  };

  return render;
}
