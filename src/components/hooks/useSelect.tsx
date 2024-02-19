import { MenuItem } from '@blueprintjs/core';
import { ItemRenderer } from '@blueprintjs/select';
import { useState } from 'react';

export function useSelect<T extends { label: string }>() {
  const [value, setValue] = useState<T | null>(null);
  const itemRenderer = getItemRenderer(value);
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
    return item.label.toLowerCase().includes(query.toLowerCase());
  };
  const itemListPredicate = (query: string, items: T[]) => {
    return items.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase()),
    );
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

function getItemRenderer<T extends { label: string }>(value: T | null) {
  const render: ItemRenderer<T> = (
    { label },
    { handleClick, handleFocus, modifiers, index },
  ) => (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      selected={value?.label === label}
      key={index}
      onClick={handleClick}
      onFocus={handleFocus}
      roleStructure="listoption"
      text={label}
    />
  );
  return render;
}
