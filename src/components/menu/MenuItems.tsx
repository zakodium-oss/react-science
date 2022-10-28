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
    items: css({
      display: 'grid',
      gridTemplateColumns: '40px auto',
      width: 'fit-content',
      alignItems: 'center',
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
          display: 'contents',
          cursor: 'pointer',
          fontSize: '0.875rem',
          '& > div': {
            paddingTop: 2,
            paddingBottom: 2,
            ...(!option.disabled
              ? {
                  ':hover': {
                    backgroundColor: 'rgb(243, 244, 246)',
                  },
                }
              : undefined),
            ...(active
              ? {
                  backgroundColor: 'rgb(243, 244, 246)',
                }
              : undefined),
          },
        },
        option.disabled && {
          color: 'rgb(163, 163, 163)',
          cursor: 'default',
        },
      ),
    divider: css({
      width: '100%',
      color: 'rgb(229, 229, 229)',
      marginTop: 5,
      marginBottom: 5,
    }),
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
    // <hr css={styles.divider} />
    return null;
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
