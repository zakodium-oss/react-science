/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Menu } from '@headlessui/react';
import type { ReactNode } from 'react';

export interface MenuOption<T> {
  type: 'option';
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  data?: T;
}

export interface MenuDivider {
  type: 'divider';
}

export type MenuOptions<T> = Array<MenuOption<T> | MenuDivider>;

export interface MenuItemsProps<T> {
  options: MenuOptions<T>;
  onSelect: (selected: MenuOption<T>) => void;
  itemsStatic?: boolean;
}

interface ItemProps<T> {
  option: MenuOptions<T>[number];
  onSelect: MenuItemsProps<T>['onSelect'];
}

interface ItemOptionProps<T> {
  option: MenuOption<T>;
  onSelect: MenuItemsProps<T>['onSelect'];
  active: boolean;
}

const spacing = {
  width: 180,
};

const styles = {
  items: {
    width: spacing.width,
    borderRadius: 6,
    backgroundColor: 'white',
    boxShadow:
      'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 5px 12px',
    paddingTop: 5,
    paddingBottom: 5,
  },
  item: {
    color: 'black',
    minWidth: spacing.width,
    maxWidth: spacing.width,
    width: 'fit-content',
    fontSize: '0.875rem',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  divider: {
    width: '100%',
    color: 'rgb(229, 229, 229)',
    marginTop: 5,
    marginBottom: 5,
  },
};

export function MenuItems<T>(props: MenuItemsProps<T>) {
  const { options, onSelect, itemsStatic } = props;

  return (
    <Menu.Items static={itemsStatic} css={css(styles.items)}>
      {options.map((option, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Item key={index} onSelect={onSelect} option={option} />
      ))}
    </Menu.Items>
  );
}

function Item<T>(props: ItemProps<T>) {
  const { option, onSelect } = props;
  const isDivider = option.type === 'divider';

  if (isDivider) {
    return <hr css={css(styles.divider)} />;
  }

  return (
    <Menu.Item disabled={option.disabled}>
      {({ active }) => (
        <ItemOption onSelect={onSelect} option={option} active={active} />
      )}
    </Menu.Item>
  );
}

function ItemOption<T>(props: ItemOptionProps<T>) {
  const { onSelect, option, active } = props;
  const { disabled } = option;

  return (
    <div
      onClick={() => onSelect(option)}
      css={css([
        {
          ...styles.item,
          display: 'flex',
          flexDirection: 'row',
          gap: 15,
          alignItems: 'center',
          cursor: 'pointer',
        },
        disabled && {
          color: 'rgb(163, 163, 163)',
          cursor: 'default',
        },
        !disabled && {
          '&:hover': {
            backgroundColor: 'rgb(243, 244, 246)',
          },
        },
        !disabled &&
          active && {
            backgroundColor: 'rgb(243, 244, 246)',
          },
      ])}
    >
      {option.icon && <span>{option.icon}</span>}
      <span>{option.label}</span>
    </div>
  );
}
