import {
  Dialog,
  DialogBody,
  Menu,
  MenuDivider,
  MenuItem,
} from '@blueprintjs/core';
import { ItemListRenderer, Select } from '@blueprintjs/select';
import styled from '@emotion/styled';
import {
  CSSProperties,
  Dispatch,
  Fragment,
  SetStateAction,
  useState,
} from 'react';

import { Button, useOnOff, useSelect } from '../../src/components';

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
  itemsParentRef,
  filteredItems,
  renderItem,
  menuProps,
}) => {
  const { groups, withoutGroup } = getGroups(filteredItems);
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
  [hoveredGroup, setHoveredGroup]: [
    string | undefined,
    Dispatch<SetStateAction<string | undefined>>,
  ],
) {
  const render: ItemListRenderer<ItemsType> = ({
    filteredItems,
    itemsParentRef,
    renderItem,
    menuProps,
    activeItem,
  }) => {
    const { groups, withoutGroup } = getGroups(filteredItems);
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
            popoverProps={{
              isOpen: hoveredGroup
                ? hoveredGroup === group
                : items.map((item) => item === activeItem).includes(true),
              onInteraction: (nextOpenState) => {
                if (items.map((item) => item === activeItem).includes(true)) {
                  return;
                }
                if (nextOpenState) {
                  setHoveredGroup(group);
                } else if (hoveredGroup) {
                  setHoveredGroup(undefined);
                }
              },
            }}
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
  return render;
}

export function OnlyOptions() {
  const { value, ...defaultProps } = useSelect<{ label: string }>({
    itemTextKey: 'label',
  });
  return (
    <>
      <Select
        items={[{ label: 'Apple' }, { label: 'Banana' }, { label: 'Orange' }]}
        filterable={false}
        itemsEqual="label"
        {...defaultProps}
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

export function FiltrableOptions() {
  const { value, ...defaultProps } = useSelect<{ label: string }>({
    itemTextKey: 'label',
  });
  return (
    <>
      <Select
        items={[{ label: 'Apple' }, { label: 'Banana' }, { label: 'Orange' }]}
        itemsEqual="label"
        {...defaultProps}
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
  const { value, ...defaultProps } = useSelect<ItemsType>({
    itemTextKey: 'label',
  });
  return (
    <>
      <Select
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
        {...defaultProps}
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
export function FilteredCategories() {
  const { value, ...defaultProps } = useSelect<ItemsType>({
    itemTextKey: 'label',
  });
  return (
    <>
      <Select
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
        {...defaultProps}
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
  const { value, ...defaultProps } = useSelect<ItemsType>({
    itemTextKey: 'label',
  });

  return (
    <>
      <Select
        // filterable={false}
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
        {...defaultProps}
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
  const { value, ...defaultProps } = useSelect<ItemsType>({
    itemTextKey: 'label',
  });
  const hoverState = useState<string | undefined>(undefined);
  return (
    <>
      <Select
        filterable={false}
        itemsEqual="label"
        itemListRenderer={renderMenuNested(value as ItemsType, hoverState)}
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
        {...defaultProps}
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
  const { value, ...defaultProps } = useSelect<{ label: string }>({
    getItemText: (item) => item.label,
  });
  return (
    <>
      <Select
        items={[{ label: 'Apple' }, { label: 'Banana' }, { label: 'Orange' }]}
        itemDisabled={(item) => item.label === 'Orange'}
        filterable={false}
        itemsEqual="label"
        {...defaultProps}
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
  const { value, ...defaultProps } = useSelect<ItemsType>({
    itemTextKey: 'label',
  });
  return (
    <>
      <Select
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
        {...defaultProps}
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
  const { value, ...defaultProps } = useSelect<{ label: string }>({
    itemTextKey: 'label',
  });
  return (
    <>
      <Select
        items={[{ label: 'Apple' }, { label: 'Banana' }, { label: 'Orange' }]}
        filterable={false}
        itemsEqual="label"
        disabled
        {...defaultProps}
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
  const { value, ...defaultProps } = useSelect<{ label: string }>({
    itemTextKey: 'label',
  });
  return (
    <>
      <Select
        items={[{ label: 'Apple' }, { label: 'Banana' }, { label: 'Orange' }]}
        filterable={false}
        itemsEqual="label"
        popoverContentProps={{ style: { width: '500px' } }}
        {...defaultProps}
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

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
});

const Tag = styled.div({
  borderRadius: '25px',
  minWidth: '25px',
  minHeight: '25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '11px',
});

export function WithCustomRenderItem() {
  const { value, ...defaultProps } = useSelect<{
    label: string;
    color: CSSProperties['color'];
  }>({
    itemTextKey: 'label',
    renderItem: ({ label, color }) => (
      <Row>
        <Tag
          style={{
            backgroundColor: color,
          }}
        >
          <span>{label.charAt(0)}</span>
        </Tag>
        <span style={{ flex: 1, padding: '0 5px' }}>{label}</span>
        <Tag
          style={{
            border: `${color} 1px solid`,
            padding: '0 10px',
          }}
        >
          <span>fruits</span>
        </Tag>
      </Row>
    ),
  });
  return (
    <>
      <Select
        items={[
          { label: 'Apple', color: 'greenyellow' },
          { label: 'Banana', color: 'yellow' },
          { label: 'Orange', color: 'orange' },
        ]}
        filterable={false}
        itemsEqual="label"
        {...defaultProps}
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
  const defaultProps = useSelect<{ label: string }>({ itemTextKey: 'label' });
  const value = { label: 'Orange' };
  return (
    <>
      <Select
        items={[{ label: 'Apple' }, { label: 'Banana' }, { label: 'Orange' }]}
        filterable={false}
        itemsEqual="label"
        {...defaultProps}
        onItemSelect={() => null}
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

export function NullValueNoopHandle() {
  const defaultProps = useSelect<{ label: string }>({ itemTextKey: 'label' });
  const value = null;
  return (
    <>
      <Select
        items={[{ label: 'Apple' }, { label: 'Banana' }, { label: 'Orange' }]}
        filterable={false}
        itemsEqual="label"
        {...defaultProps}
        onItemSelect={() => null}
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
  const { value, setValue, ...defaultProps } = useSelect<{ label: string }>({
    itemTextKey: 'label',
  });
  return (
    <>
      <Select
        items={[{ label: 'Apple' }, { label: 'Banana' }, { label: 'Orange' }]}
        filterable={false}
        itemsEqual="label"
        {...defaultProps}
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
  const { value, ...defaultProps } = useSelect<{ label: string }>({
    itemTextKey: 'label',
  });
  return (
    <>
      <Button onClick={open}>Open</Button>
      <Dialog
        shouldReturnFocusOnClose={false}
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
              items={[
                { label: 'Apple' },
                { label: 'Banana' },
                { label: 'Orange' },
              ]}
              filterable={false}
              itemsEqual="label"
              {...defaultProps}
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
