import { ClassNames, ClassNamesContent } from '@emotion/react';
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

const styles = (css: ClassNamesContent['css']) => {
  return {
    items: css`
      display: grid;
      grid-template-columns: 40px auto;
      width: fit-content;
      align-items: center;
      border-radius: 6px;
      background-color: white;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
        rgba(0, 0, 0, 0.22) 0px 5px 12px;
      padding-top: 5px;
      padding-bottom: 5px;
    `,
    item: (active: boolean, option: MenuOption<any>) =>
      css`
        display: contents;
        cursor: ${option.disabled ? 'default' : 'pointer'};
        font-size: 0.875rem;
        color: ${!option.disabled ? 'black' : 'rgb(163, 163, 163)'};
        & > div {
          padding-top: 2px;
          padding-bottom: 2px;
          ${active && 'background-color: rgb(243, 244, 246);'}
        }

        ${!option.disabled &&
        `
          &:hover > div {
            background-color: rgb(243, 244, 246);
          }
        `}
      `,
    divider: css`
      width: 100%;
      color: rgb(229, 229, 229);
      margin-top: 5px;
      margin-bottom: 5px;
      grid-column: 1 / span 2;
    `,
  };
};

export function MenuItems<T>(props: MenuItemsProps<T>) {
  const { options, onSelect, itemsStatic } = props;

  return (
    <ClassNames>
      {({ css }) => (
        <Menu.Items static={itemsStatic} className={styles(css).items}>
          {options.map((option, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Item key={index} onSelect={onSelect} option={option} />
          ))}
        </Menu.Items>
      )}
    </ClassNames>
  );
}

function Item<T>(props: ItemProps<T>) {
  const { option, onSelect } = props;
  const isDivider = option.type === 'divider';

  if (isDivider) {
    return (
      <ClassNames>
        {({ css }) => <hr className={styles(css).divider} />}
      </ClassNames>
    );
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
    <ClassNames>
      {({ css }) => (
        <div
          onClick={() => onSelect(option)}
          className={styles(css).item(active, option)}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              paddingLeft: '1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {option.icon}
          </div>
          <div style={{ paddingRight: '1rem' }}>{option.label}</div>
        </div>
      )}
    </ClassNames>
  );
}
