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

const styles = {
  items: css({
    display: 'grid',
    gridTemplateColumns: '1fr',
    width: 'fit-content',
    borderRadius: 6,
    backgroundColor: 'white',
    boxShadow:
      'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 5px 12px',
    paddingTop: 5,
    paddingBottom: 5,
  }),
  item: (active: boolean, option: MenuOption<any>) =>
    css(
      {
        display: 'grid',
        gridTemplateColumns: 'minmax(0px, 14px) auto',
        alignItems: 'center',
        cursor: 'pointer',
        fontSize: '0.875rem',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: '1rem',
        paddingRight: '1rem',
        color: 'black',
        gap: 15,
      },
      !option.disabled &&
        active && {
          backgroundColor: 'rgb(243, 244, 246)',
        },
      option.disabled
        ? {
            color: 'rgb(163, 163, 163)',
            cursor: 'default',
          }
        : {
            '&:hover': {
              backgroundColor: 'rgb(243, 244, 246)',
            },
          },
    ),
  divider: css({
    width: '100%',
    color: 'rgb(229, 229, 229)',
    marginTop: 5,
    marginBottom: 5,
  }),
};

export function MenuItems<T>(props: MenuItemsProps<T>) {
  const { options, onSelect, itemsStatic } = props;

  return (
    <Menu.Items static={itemsStatic} css={styles.items}>
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
    return <hr css={styles.divider} />;
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

  return (
    <div onClick={() => onSelect(option)} css={styles.item(active, option)}>
      <span>{option.icon}</span>
      <span>{option.label}</span>
    </div>
  );
}
