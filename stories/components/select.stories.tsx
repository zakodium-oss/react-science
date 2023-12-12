import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { ItemListRenderer, ItemRenderer, Select } from '@blueprintjs/select';
import { Fragment, useState } from 'react';

import { Button, Modal, useOnOff } from '../../src/components';
import { useRootLayoutContext } from '../../src/components/root-layout/RootLayoutContext';

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
const renderMenuNested: ItemListRenderer<ItemsType> = ({
  items,
  itemsParentRef,
  renderItem,
  menuProps,
}) => {
  const { groups, withoutGroup } = getGroups(items);

  return (
    <Menu role="listbox" {...menuProps} ulRef={itemsParentRef}>
      {groups.map(({ group, items }) => (
        <MenuItem key={group} text={group}>
          {items.map(renderItem)}
        </MenuItem>
      ))}
      {groups.length > 0 && withoutGroup.length > 0 && <MenuDivider />}
      {withoutGroup.map(renderItem)}
    </Menu>
  );
};
const render: ItemRenderer<ItemsType> = (
  { label },
  { handleClick, handleFocus, modifiers, index },
) => (
  <MenuItem
    active={modifiers.active}
    disabled={modifiers.disabled}
    icon={modifiers.active ? 'tick' : 'blank'}
    key={index}
    onClick={handleClick}
    onFocus={handleFocus}
    roleStructure="listoption"
    text={label}
  />
);
export function OnlyOptions() {
  const [value, setValue] = useState<ItemsType | null>(null);
  return (
    <>
      <Select
        activeItem={value}
        onItemSelect={(item) => setValue(item)}
        items={[{ label: 'Apple' }, { label: 'Banana' }, { label: 'Orange' }]}
        itemRenderer={render}
        filterable={false}
        itemsEqual="label"
        popoverTargetProps={{ style: { display: 'inline-block' } }}
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
        activeItem={value}
        onItemSelect={(item) => setValue(item)}
        itemRenderer={render}
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
      >
        <Button
          text={value?.label ?? 'Select'}
          rightIcon="double-caret-vertical"
        />
      </Select>
      {/*<p>Value outside component is {value?.label}.</p>*/}
    </>
  );
}
export function OptionsWithCategories() {
  const [value, setValue] = useState<ItemsType | null>(null);
  return (
    <>
      <Select
        activeItem={value}
        onItemSelect={(item) => setValue(item)}
        itemRenderer={render}
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
        activeItem={value}
        onItemSelect={(item) => setValue(item)}
        itemRenderer={render}
        filterable={false}
        itemsEqual="label"
        itemListRenderer={renderMenuNested}
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
        itemRenderer={render}
        onItemSelect={setValue}
        itemDisabled={(item) => item.label === 'Orange'}
        filterable={false}
        itemsEqual="label"
        activeItem={value}
        popoverTargetProps={{ style: { display: 'inline-block' } }}
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
        activeItem={value}
        onItemSelect={(item) => setValue(item)}
        itemRenderer={render}
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
        itemRenderer={render}
        onItemSelect={setValue}
        filterable={false}
        itemsEqual="label"
        activeItem={value}
        disabled
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
        itemRenderer={render}
        onItemSelect={setValue}
        filterable={false}
        itemsEqual="label"
        activeItem={value}
        popoverContentProps={{ style: { width: '500px' } }}
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
        itemRenderer={render}
        filterable={false}
        itemsEqual="label"
        activeItem={value}
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
        itemRenderer={render}
        filterable={false}
        itemsEqual="label"
        activeItem={value}
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
        itemRenderer={render}
        filterable={false}
        itemsEqual="label"
        activeItem={value}
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

function ModalBody() {
  const [value, setValue] = useState<ItemsType | null>(null);
  const context = useRootLayoutContext();
  return (
    <Modal.Body>
      <div style={{ margin: 4 }}>
        <p>Hello, world!</p>
        {context && (
          <Select
            onItemSelect={setValue}
            items={[
              { label: 'Apple' },
              { label: 'Banana' },
              { label: 'Orange' },
            ]}
            itemRenderer={render}
            filterable={false}
            itemsEqual="label"
            activeItem={value}
            popoverProps={{
              portalContainer: context,
              positioningStrategy: 'fixed',
            }}
            popoverTargetProps={{
              style: { display: 'inline-block', backgroundColor: 'red' },
            }}
          >
            <Button
              style={{ backgroundColor: 'green' }}
              text={value?.label ?? 'Select a status'}
              rightIcon="double-caret-vertical"
            />
          </Select>
        )}
      </div>
    </Modal.Body>
  );
}

export function InModal() {
  const [isOpen, open, close] = useOnOff();
  return (
    <>
      <Button onClick={open}>Open</Button>
      <Modal
        width={300}
        height={200}
        isOpen={isOpen}
        onRequestClose={() => {
          close();
        }}
      >
        <Modal.Header>Select a fruit</Modal.Header>
        <ModalBody />
      </Modal>
    </>
  );
}
