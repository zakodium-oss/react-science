import { MenuItem } from '@blueprintjs/core';
import type { ItemRenderer } from '@blueprintjs/select';
import type { ReactNode } from 'react';

export type SelectId = string | number | null;

export type GetOptionValue<OptionType, ID extends SelectId> = (
  option: OptionType | undefined,
) => ID | undefined;
export type GetOptionLabel<OptionType> = (
  option: OptionType | undefined,
) => ReactNode;

export interface GetItemRendererOptions<OptionType, ID extends SelectId> {
  selected: ID | undefined;
  getValue: GetOptionValue<OptionType, ID>;
  getLabel: GetOptionLabel<OptionType>;
}

export function getItemRenderer<OptionType, ID extends SelectId>(
  options: GetItemRendererOptions<OptionType, ID>,
) {
  const { selected, getValue, getLabel } = options;

  const render: ItemRenderer<OptionType> = (
    item,
    { handleClick, handleFocus, modifiers, index },
  ) => {
    const label = getLabel(item);
    const { active, disabled, matchesPredicate } = modifiers;
    if (!matchesPredicate) return null;
    return (
      <MenuItem
        active={active}
        disabled={disabled}
        selected={selected === getValue(item)}
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

export interface SelectOptionLabel {
  label: string;
}

export function getSelectLabel(
  option: SelectOptionLabel | undefined,
): string | undefined {
  return option?.label;
}

export interface SelectOption<ID> extends SelectOptionLabel {
  value: ID;
}

export function getSelectValue<Option extends SelectOption<unknown>>(
  option: Option | undefined,
): Option['value'] | undefined {
  return option?.value;
}
