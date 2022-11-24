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

const Divider = styled.hr`
  width: 100%;
  color: rgb(229, 229, 229);
  margin-top: 5px;
  margin-bottom: 5px;
  grid-column: 1 / -1;
`;

const ItemsDiv = styled.div<{
  hasOneIconOrMore: boolean;
}>`
  display: grid;
  grid-template-columns: [icon-start] ${(props) =>
      props.hasOneIconOrMore ? '40px' : '0px'} [label-start] auto;
  width: fit-content;
  align-items: center;
  border-radius: 6px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 5px 12px;
  padding-top: 5px;
  padding-bottom: 5px;
  --cell-padding: 16px;
`;

const LabelDiv = styled.div`
  grid-column-start: label-start;
  padding-right: var(--cell-padding);
  padding-left: var(--cell-padding);
`;

const IconDiv = styled.div`
  grid-column-start: icon-start;
  width: 100%;
  height: 100%;
  padding-left: var(--cell-padding);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface MenuItemsProps<T> {
  options: MenuOptions<T>;
  onSelect: (selected: MenuOption<T>) => void;
  itemsStatic?: boolean;
}

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
        />
      ))}
    </Menu.Items>
  );
}

interface ItemProps<T> {
  option: MenuOptions<T>[number];
  onSelect: MenuItemsProps<T>['onSelect'];
}

function Item<T>(props: ItemProps<T>) {
  const { option, onSelect } = props;
  const isDivider = option.type === 'divider';

  if (isDivider) {
    return <Divider />;
  }

  return (
    <Menu.Item disabled={option.disabled}>
      {({ active }) => (
        <ItemDiv
          onClick={() => {
            if (!option.disabled) {
              onSelect(option);
            }
          }}
          active={active}
          disabled={option.disabled || false}
        >
          <IconDiv>{option.icon}</IconDiv>
          <LabelDiv>{option.label}</LabelDiv>
        </ItemDiv>
      )}
    </Menu.Item>
  );
}
