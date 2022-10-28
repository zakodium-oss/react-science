import styled from '@emotion/styled';
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
  dividerSpan: number;
  onSelect: MenuItemsProps<T>['onSelect'];
}

interface ItemOptionProps<T> {
  option: MenuOption<T>;
  onSelect: MenuItemsProps<T>['onSelect'];
  active: boolean;
  hasOneIconOrMore: boolean;
}

const ItemDiv = styled.div<{
  disabled: boolean;
  active: boolean;
}>`
  display: contents;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  font-size: 0.875rem;
  color: ${(props) => (!props.disabled ? 'black' : 'rgb(163, 163, 163)')};
  & > div {
    padding-top: 2px;
    padding-bottom: 2px;
    ${(props) => props.active && 'background-color: rgb(243, 244, 246);'}
  }

  ${(props) =>
    !props.disabled &&
    `
          &:hover > div {
            background-color: rgb(243, 244, 246);
          }
        `}
`;

const Divider = styled.hr<{ span: number }>`
  width: 100%;
  color: rgb(229, 229, 229);
  margin-top: 5px;
  margin-bottom: 5px;
  grid-column: 1 / span ${(props) => props.span};
`;

const ItemsDiv = styled.div<{
  hasOneIconOrMore: boolean;
}>`
  display: grid;
  grid-template-columns: ${(props) => props.hasOneIconOrMore && '40px'} auto;
  width: fit-content;
  align-items: center;
  border-radius: 6px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 5px 12px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const LabelDiv = styled.div<{ hasOneIconOrMore: boolean }>`
  padding-right: 1rem;
  ${(props) => !props.hasOneIconOrMore && `padding-left: 1rem;`}
`;

export function MenuItems<T>(props: MenuItemsProps<T>) {
  const { options, onSelect, itemsStatic } = props;
  const hasOneOrMoreIcon = options.some(
    (option) => option.type === 'option' && option.icon,
  );

  return (
    <Menu.Items
      as={ItemsDiv}
      static={itemsStatic}
      hasOneIconOrMore={hasOneOrMoreIcon}
    >
      {options.map((option, index) => (
        <Item
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          onSelect={onSelect}
          option={option}
          dividerSpan={hasOneOrMoreIcon ? 2 : 1}
        />
      ))}
    </Menu.Items>
  );
}

function Item<T>(props: ItemProps<T>) {
  const { option, onSelect, dividerSpan } = props;
  const isDivider = option.type === 'divider';

  if (isDivider) {
    return <Divider span={dividerSpan} />;
  }

  return (
    <Menu.Item disabled={option.disabled}>
      {({ active }) => (
        <ItemOption
          onSelect={onSelect}
          option={option}
          active={active}
          hasOneIconOrMore={dividerSpan === 2}
        />
      )}
    </Menu.Item>
  );
}

function ItemOption<T>(props: ItemOptionProps<T>) {
  const { onSelect, option, active, hasOneIconOrMore } = props;

  return (
    <ItemDiv
      onClick={() => onSelect(option)}
      active={active}
      disabled={option.disabled || false}
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
      <LabelDiv hasOneIconOrMore={hasOneIconOrMore}>{option.label}</LabelDiv>
    </ItemDiv>
  );
}
