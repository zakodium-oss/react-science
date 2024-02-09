import {
  Dialog,
  DialogBody,
  Menu,
  MenuDivider,
  MenuItem,
} from '@blueprintjs/core';
import { ItemListRenderer, ItemRenderer, Select } from '@blueprintjs/select';
import { Fragment, useState } from 'react';

import { Button, useOnOff } from '../../src/components';

export default {
  title: 'Forms / Select',
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (storyFn: any) => (
      <div style={{ width: '100%', padding: '10px' }}>{storyFn()}</div>
    ),
  ],
};

interface ItemsType {
  label: string;
  group?: string;
}

function getGroups(items: ItemsType[]) {
  const groups: Array<{ group?: string; items: ItemsType[] }> = [];

  const withoutGroup: ItemsType[] = [];
  for (const item of items) {
    if (!item.group) {
      withoutGroup.push(item);
      continue;
    }
    const group = groups.find((g) => g.group === item.group);
    if (group) {
      group.items.push(item);
    } else {
      groups.push({ group: item.group, items: [item] });
    }
  }
  return { groups, withoutGroup };
}

function getItemRenderer(value: ItemsType | null) {
  const render: ItemRenderer<ItemsType> = (
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
const renderMenu: ItemListRenderer<ItemsType> = ({
  items,
  itemsParentRef,
  renderItem,
  menuProps,
}) => {
  const { groups, withoutGroup } = getGroups(items);
  return (
    <Menu role="listbox" {...menuProps} ulRef={itemsParentRef}>
      {groups.map(({ group, items }) => (
        <Fragment key={group}>
          <MenuDivider title={group} />
          {items.map(renderItem)}
        </Fragment>
      ))}
      {groups.length > 0 && withoutGroup.length > 0 && <MenuDivider />}
      {withoutGroup.map(renderItem)}
    </Menu>
  );
};
function renderMenuNested(
  value: ItemsType | null,
): ItemListRenderer<ItemsType> {
  return ({ items, itemsParentRef, renderItem, menuProps, activeItem }) => {
    const { groups, withoutGroup } = getGroups(items);
    return (
      <Menu role="listbox" {...menuProps} ulRef={itemsParentRef}>
        {groups.map(({ group, items }) => (
          <MenuItem
            key={group}
            text={group}
            active={items.map((item) => item === activeItem).includes(true)}
            selected={items
              .map((item) => item.label === value?.label)
              .includes(true)}
            roleStructure="listoption"
          >
            {items.map(renderItem)}
          </MenuItem>
        ))}
        {groups.length > 0 && withoutGroup.length > 0 && <MenuDivider />}
        {withoutGroup.map(renderItem)}
      </Menu>
    );
  };
}

export function OnlyOptions() {
  const [value, setValue] = useState<ItemsType | null>(null);
  return (
    <>
      <Select
        onItemSelect={(item) => setValue(item)}
        items={[{ label: 'Apple' }, { label: 'Banana' }, { label: 'Orange' }]}
        itemRenderer={getItemRenderer(value)}
        filterable={false}
        itemsEqual="label"
        popoverTargetProps={{ style: { display: 'inline-block' } }}
        popoverProps={{
          onOpened: (node) => {
            const firstUl = node.querySelector('ul');
            if (firstUl) {
              firstUl.tabIndex = 0;
              firstUl.focus();
            }
          },
        }}
      >
        <Button
          text={value?.label ?? 'Select a status'}
          rightIcon="double-caret-vertical"
        />
      </Select>
      <p>Value outside component is {value?.label}.</p>
    </>
  );
}
export function OnlyCategories() {
  const [value, setValue] = useState<ItemsType | null>(null);
  return (
    <>
      <Select
        onItemSelect={(item) => setValue(item)}
        itemRenderer={getItemRenderer(value)}
        filterable={false}
        itemsEqual="label"
        itemListRenderer={renderMenu}
        items={[
          { label: 'Apple', group: 'Fruits' },
          { label: 'Banana', group: 'Fruits' },
          { label: 'Orange', group: 'Fruits' },
          { label: 'Carrot', group: 'Vegetables' },
          { label: 'Potato', group: 'Vegetables' },
          { label: 'Tomato', group: 'Vegetables' },
        ]}
        popoverTargetProps={{ style: { display: 'inline-block' } }}
        popoverProps={{
          onOpened: (node) => {
            const firstUl = node.querySelector('ul');
            if (firstUl) {
              firstUl.tabIndex = 0;
              firstUl.focus();
            }
          },
        }}
      >
        <Button
          text={value?.label ?? 'Select'}
          rightIcon="double-caret-vertical"
        />
      </Select>
      <p>Value outside component is {value?.label}.</p>
    </>
  );
}
export function OptionsWithCategories() {
  const [value, setValue] = useState<ItemsType | null>(null);

  return (
    <>
      <Select
        onItemSelect={(item) => setValue(item)}
        itemRenderer={getItemRenderer(value)}
        filterable={false}
        itemsEqual="label"
        itemListRenderer={renderMenu}
        items={[
          { label: 'Apple', group: 'Fruits' },
          { label: 'Banana', group: 'Fruits' },
          { label: 'Orange', group: 'Fruits' },
          { label: 'Carrot', group: 'Vegetables' },
          { label: 'Potato', group: 'Vegetables' },
          { label: 'Tomato', group: 'Vegetables' },
          { label: 'Pork' },
          { label: 'Beef' },
        ]}
        popoverTargetProps={{ style: { display: 'inline-block' } }}
        popoverProps={{
          onOpened: (node) => {
            const firstUl = node.querySelector('ul');
            if (firstUl) {
              firstUl.tabIndex = 0;
              firstUl.focus();
            }
          },
        }}
      >
        <Button
          text={value?.label ?? 'Select'}
          rightIcon="double-caret-vertical"
        />
      </Select>
      <p>Value outside component is {value?.label}.</p>
    </>
  );
}
export function CategoriesNested() {
  const [value, setValue] = useState<ItemsType | null>(null);
  return (
    <>
      <Select
        onItemSelect={(item) => setValue(item)}
        itemRenderer={getItemRenderer(value)}
        filterable={false}
        itemsEqual="label"
        itemListRenderer={renderMenuNested(value)}
        items={[
          { label: 'Apple', group: 'Fruits' },
          { label: 'Banana', group: 'Fruits' },
          { label: 'Orange', group: 'Fruits' },
          { label: 'Carrot', group: 'Vegetables' },
          { label: 'Potato', group: 'Vegetables' },
          { label: 'Tomato', group: 'Vegetables' },
          { label: 'Pork' },
          { label: 'Beef' },
        ]}
        popoverTargetProps={{ style: { display: 'inline-block' } }}
        popoverProps={{
          onOpened: (node) => {
            const firstUl = node.querySelector('ul');
            if (firstUl) {
              firstUl.tabIndex = 0;
              firstUl.focus();
            }
          },
        }}
      >
        <Button
          text={value?.label ?? 'Select'}
          rightIcon="double-caret-vertical"
        />
      </Select>
      <p>Value outside component is {value?.label}.</p>
    </>
  );
}

export function DisabledOptions() {
  const [value, setValue] = useState<ItemsType | null>(null);
  return (
    <>
      <Select
        items={[{ label: 'Apple' }, { label: 'Banana' }, { label: 'Orange' }]}
        itemRenderer={getItemRenderer(value)}
        onItemSelect={setValue}
        itemDisabled={(item) => item.label === 'Orange'}
        filterable={false}
        itemsEqual="label"
        popoverTargetProps={{ style: { display: 'inline-block' } }}
        popoverProps={{
          onOpened: (node) => {
            const firstUl = node.querySelector('ul');
            if (firstUl) {
              firstUl.tabIndex = 0;
              firstUl.focus();
            }
          },
        }}
      >
        <Button
          text={value?.label ?? 'Select a status'}
          rightIcon="double-caret-vertical"
        />
      </Select>
      <p>Value outside component is {value?.label}.</p>
    </>
  );
}

export function DisabledInCategories() {
  const [value, setValue] = useState<ItemsType | null>(null);
  return (
    <>
      <Select
        onItemSelect={(item) => setValue(item)}
        itemRenderer={getItemRenderer(value)}
        filterable={false}
        itemsEqual="label"
        itemListRenderer={renderMenu}
        items={[
          { label: 'Apple', group: 'Fruits' },
          { label: 'Banana', group: 'Fruits' },
          { label: 'Orange', group: 'Fruits' },
          { label: 'Carrot', group: 'Vegetables' },
          { label: 'Potato', group: 'Vegetables' },
          { label: 'Tomato', group: 'Vegetables' },
        ]}
        itemDisabled={(item) =>
          item.label === 'Potato' || item.group === 'Fruits'
        }
        popoverTargetProps={{ style: { display: 'inline-block' } }}
        popoverProps={{
          onOpened: (node) => {
            const firstUl = node.querySelector('ul');
            if (firstUl) {
              firstUl.tabIndex = 0;
              firstUl.focus();
            }
          },
        }}
      >
        <Button
          text={value?.label ?? 'Select'}
          rightIcon="double-caret-vertical"
        />
      </Select>
      <p>Value outside component is {value?.label}.</p>
    </>
  );
}

export function Disabled() {
  const [value, setValue] = useState<ItemsType | null>(null);
  return (
    <>
      <Select
        items={[{ label: 'Apple' }, { label: 'Banana' }, { label: 'Orange' }]}
        itemRenderer={getItemRenderer(value)}
        onItemSelect={setValue}
        filterable={false}
        itemsEqual="label"
        disabled
        popoverProps={{
          onOpened: (node) => {
            const firstUl = node.querySelector('ul');
            if (firstUl) {
              firstUl.tabIndex = 0;
              firstUl.focus();
            }
          },
        }}
        popoverTargetProps={{ style: { display: 'inline-block' } }}
      >
        <Button
          disabled
          text={value?.label ?? 'Select a status'}
          rightIcon="double-caret-vertical"
        />
      </Select>
      <p>Value outside component is {value?.label}.</p>
    </>
  );
}
export function WithCustomStyle() {
  const [value, setValue] = useState<ItemsType | null>(null);
  return (
    <>
      <Select
        items={[{ label: 'Apple' }, { label: 'Banana' }, { label: 'Orange' }]}
        itemRenderer={getItemRenderer(value)}
        onItemSelect={setValue}
        filterable={false}
        itemsEqual="label"
        popoverTargetProps={{ style: { display: 'inline-block' } }}
        popoverContentProps={{ style: { width: '500px' } }}
        popoverProps={{
          onOpened: (node) => {
            const firstUl = node.querySelector('ul');
            if (firstUl) {
              firstUl.tabIndex = 0;
              firstUl.focus();
            }
          },
        }}
      >
        <Button
          style={{ width: '500px' }}
          text={value?.label ?? 'Select a status'}
          rightIcon="double-caret-vertical"
        />
      </Select>
      <p>Value outside component is {value?.label}.</p>
    </>
  );
}

export function FixedValueNoopHandle() {
  const value = { label: 'Orange' };
  return (
    <>
      <Select
        items={[{ label: 'Apple' }, { label: 'Banana' }, { label: 'Orange' }]}
        onItemSelect={() => null}
        itemRenderer={getItemRenderer(value)}
        filterable={false}
        itemsEqual="label"
        popoverTargetProps={{ style: { display: 'inline-block' } }}
        popoverProps={{
          onOpened: (node) => {
            const firstUl = node.querySelector('ul');
            if (firstUl) {
              firstUl.tabIndex = 0;
              firstUl.focus();
            }
          },
        }}
      >
        <Button
          text={value.label ?? 'Select a status'}
          rightIcon="double-caret-vertical"
        />
      </Select>
      <p>Value outside component is {value.label}.</p>
    </>
  );
}

export function nullValueNoopHandle() {
  const value = null;
  return (
    <>
      <Select
        onItemSelect={() => null}
        items={[{ label: 'Apple' }, { label: 'Banana' }, { label: 'Orange' }]}
        itemRenderer={getItemRenderer(value)}
        filterable={false}
        itemsEqual="label"
        popoverTargetProps={{ style: { display: 'inline-block' } }}
        popoverProps={{
          onOpened: (node) => {
            const firstUl = node.querySelector('ul');
            if (firstUl) {
              firstUl.tabIndex = 0;
              firstUl.focus();
            }
          },
        }}
      >
        <Button
          text={value ?? 'Select a status'}
          rightIcon="double-caret-vertical"
        />
      </Select>
      <p>Value outside component is {value}.</p>
    </>
  );
}

export function ResetButton() {
  const [value, setValue] = useState<ItemsType | null>(null);
  return (
    <>
      <Select
        onItemSelect={setValue}
        items={[{ label: 'Apple' }, { label: 'Banana' }, { label: 'Orange' }]}
        itemRenderer={getItemRenderer(value)}
        filterable={false}
        itemsEqual="label"
        popoverTargetProps={{ style: { display: 'inline-block' } }}
        popoverProps={{
          onOpened: (node) => {
            const firstUl = node.querySelector('ul');
            if (firstUl) {
              firstUl.tabIndex = 0;
              firstUl.focus();
            }
          },
        }}
      >
        <Button
          text={value?.label ?? 'Select a status'}
          rightIcon="double-caret-vertical"
        />
      </Select>
      <p>Value outside component is {value?.label}.</p>
      <Button onClick={() => setValue(null)}>Reset</Button>
    </>
  );
}

export function InDialog() {
  const [isOpen, open, close] = useOnOff();
  const [value, setValue] = useState<ItemsType | null>(null);
  return (
    <>
      <Button onClick={open}>Open</Button>
      <Dialog
        title="Select a fruit"
        isOpen={isOpen}
        onClose={() => {
          close();
        }}
      >
        <DialogBody>
          <div style={{ margin: 4 }}>
            <p>Hello, world!</p>
            <Select
              onItemSelect={setValue}
              items={[
                { label: 'Apple' },
                { label: 'Banana' },
                { label: 'Orange' },
              ]}
              itemRenderer={getItemRenderer(value)}
              filterable={false}
              itemsEqual="label"
              popoverProps={{
                positioningStrategy: 'fixed',
                onOpened: (node) => {
                  const firstLi = node.querySelector('li');
                  if (firstLi) {
                    firstLi.tabIndex = 0;
                    firstLi.focus();
                  }
                },
              }}
              popoverTargetProps={{
                style: { display: 'inline-block' },
              }}
            >
              <Button
                text={value?.label ?? 'Select a status'}
                rightIcon="double-caret-vertical"
              />
            </Select>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
