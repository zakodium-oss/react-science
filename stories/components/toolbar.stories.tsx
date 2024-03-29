import { Menu, MenuItem } from '@blueprintjs/core';
import { Meta } from '@storybook/react';
import { JSX, useState } from 'react';
import { BiClipboard, BiCreditCard, BiPaperclip } from 'react-icons/bi';
import { FaClipboard, FaCreditCard, FaPaperclip } from 'react-icons/fa6';
import { HiClipboard, HiCreditCard, HiOutlinePaperClip } from 'react-icons/hi2';

import {
  Toolbar,
  ToolbarItemProps,
  ToolbarProps,
  PopoverInteractionType,
} from '../../src/components';

export default {
  title: 'Components / Toolbar',
  component: Toolbar,
  args: {
    vertical: false,
    intent: 'none',
    disabled: false,
  },
  argTypes: {
    onClick: { action: 'handle' },
  },
} as Meta<ToolbarProps>;

type ToolbarItems = Array<
  Pick<ToolbarItemProps, 'title' | 'icon' | 'disabled'> & {
    id: string;
    content?: JSX.Element;
  }
>;

const itemsBlueprintIcons: ToolbarItems = [
  { id: 'copy', icon: 'phone', title: 'Phone' },
  { id: 'paste', icon: 'add-column-left', title: 'Add left' },
  { id: 'undo', icon: 'add-column-right', title: 'Right' },
  {
    id: 'redo',
    icon: 'redo',
    title: 'Redo',
  },
  { id: 'test1', icon: 'undo', title: 'Undo' },
  { id: 'test2', icon: 'paperclip', title: 'Attachment' },
  { id: 'test3', icon: 'help', title: 'Help' },
  { id: 'test4', icon: 'lab-test', title: 'Lab', disabled: true },
  { id: 'test5', icon: 'trash', title: 'Trash' },
];

const itemsMixedIcons: ToolbarItems = [
  {
    id: 'paperclip-blueprint',
    icon: 'paperclip',
    title: 'BlueprintJS paperclip icon',
  },
  {
    id: 'paperclip-fa',
    icon: <FaPaperclip />,
    title: 'Fontawesome paperclip icon',
  },
  {
    id: 'paperclip-hi-2',
    icon: <HiOutlinePaperClip />,
    title: 'Heroicons 2 paperclip icon',
  },
  {
    id: 'paperclip-bi',
    icon: <BiPaperclip />,
    title: 'Box icons paperclip icon',
  },
  {
    id: 'clipboard-blueprint',
    icon: 'clipboard',
    title: 'BlueprintJS paperclip icon',
  },
  {
    id: 'clipboard-fontawesome',
    icon: <FaClipboard />,
    title: 'Fontawesome clipboard icon',
  },

  {
    id: 'clipboard-hi-2',
    icon: <HiClipboard />,
    title: 'Heroicons 2 clipboard icon',
  },
  {
    id: 'clipboard-bi',
    icon: <BiClipboard />,
    title: 'Box icons clipboard icon',
  },
  {
    id: 'credit-card-blueprint',
    icon: 'credit-card',
    title: 'BlueprintJS credit-card icon',
  },
  {
    id: 'credit-card-fa',
    icon: <FaCreditCard />,
    title: 'Fontawesome credit card icon',
  },
  {
    id: 'credit-card-hi2',
    icon: <HiCreditCard />,
    title: 'Heroicons credit card icon',
  },
  {
    id: 'credit-card-bi',
    icon: <BiCreditCard />,
    title: 'Box icons credit card icon',
    disabled: true,
  },
];

const itemsPopover: ToolbarItems = [
  {
    id: 'clipboard-bi',
    icon: <BiClipboard />,
    title: 'Box icons clipboard icon',
    content: (
      <Menu>
        <MenuItem text="Box icons clipboard icon" />
      </Menu>
    ),
  },
  {
    id: 'paste',
    icon: 'add-column-left',
    title: 'Add left',
    content: (
      <Menu>
        <MenuItem text="Add left" />
      </Menu>
    ),
  },
  {
    id: 'paperclip-bi',
    icon: <BiPaperclip />,
    title: 'Box icons paperclip icon',
    content: (
      <Menu>
        <MenuItem text="Box icons paperclip icon" />
      </Menu>
    ),
  },
  {
    id: 'clipboard-blueprint',
    icon: 'clipboard',
    title: 'BlueprintJS paperclip icon',
    content: (
      <Menu>
        <MenuItem text="BlueprintJS paperclip icon" />
      </Menu>
    ),
  },
  {
    id: 'credit-card-bi',
    icon: <BiCreditCard />,
    title: 'Box icons credit card icon',
    content: (
      <Menu>
        <MenuItem text="Box icons credit card icon" />
      </Menu>
    ),
  },
  {
    id: 'credit-card-blueprint',
    icon: 'credit-card',
    title: 'BlueprintJS credit-card icon',
    content: (
      <Menu>
        <MenuItem text="BlueprintJS credit-card icon" />
      </Menu>
    ),
  },
  {
    id: 'clipboard-hi-2',
    icon: <HiClipboard />,
    title: 'Heroicons 2 clipboard icon',
    content: (
      <Menu>
        <MenuItem text="Heroicons 2 clipboard icon" />
      </Menu>
    ),
  },
];

export function Control(props: ToolbarProps & { onClick: () => void }) {
  const { onClick, ...toolbarProps } = props;
  const [active, setActive] = useState<string | null>(null);

  return (
    <Toolbar {...toolbarProps}>
      {itemsMixedIcons.map((item) => (
        <Toolbar.Item
          key={item.id}
          id={item.id}
          title={item.title}
          onClick={() => {
            setActive(item.id);
            onClick();
          }}
          icon={item.icon}
          active={active === item.id}
          intent={item.id.startsWith('clipboard') ? 'success' : undefined}
        />
      ))}
    </Toolbar>
  );
}
export function WithTag() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Toolbar>
      {itemsMixedIcons.map((item) => (
        <Toolbar.Item
          key={item.id}
          id={item.id}
          title={item.title}
          onClick={() => {
            setActive(item.id);
          }}
          icon={item.icon}
          active={active === item.id}
          intent={item.id.startsWith('clipboard') ? 'success' : undefined}
          tag={
            (item.id.startsWith('credit-card') && 1) ||
            (item.id.startsWith('clipboard') && 14) ||
            142
          }
          tagProps={{
            intent:
              (item.id.startsWith('credit-card') && 'danger') ||
              (item.id.startsWith('clipboard') && 'primary') ||
              'success',
          }}
        />
      ))}
    </Toolbar>
  );
}
export function Vertical() {
  const [state, setState] = useState(itemsBlueprintIcons[1]);
  function handleChange({ id, icon, title }: ToolbarItemProps) {
    setState({ id: id as string, icon, title });
  }

  return (
    <div
      style={{
        display: 'flex',
        height: 200,
      }}
    >
      <div style={{ padding: 5 }}>
        <p>Something on the left</p>
      </div>
      <Toolbar vertical>
        {itemsBlueprintIcons.map((item) => (
          <Toolbar.Item
            key={item.id}
            id={item.id}
            title={item.title}
            active={state.title === item.title}
            onClick={handleChange}
            icon={item.icon}
          />
        ))}
        <Toolbar.Item title="Inbox" icon="inbox" />
      </Toolbar>
      <div style={{ padding: 5 }}>
        <p>Hello, World!</p>
        <p>Value selected: {state.title}</p>
      </div>
    </div>
  );
}

export function Horizontal() {
  const [state, setState] = useState(itemsBlueprintIcons[1]);

  function handleChange({ id, icon, title }: ToolbarItemProps) {
    setState({ id: id as string, icon, title });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Toolbar intent="primary" disabled={false}>
        {itemsBlueprintIcons.map((item) => (
          <Toolbar.Item
            key={item.id}
            id={item.id}
            title={item.title}
            active={state.id === item.id}
            onClick={handleChange}
            icon={item.icon}
            intent={item.id === 'test5' ? 'danger' : undefined}
            disabled={item.disabled ?? undefined}
          />
        ))}
      </Toolbar>
      <div style={{ padding: 5 }}>
        <p>Hello, World!</p>
        <p>Value selected: {state.title}</p>
      </div>
    </div>
  );
}

export function PopoverItems(
  props: ToolbarItems & { onClick: () => void } & {
    popoverInteractionKind: PopoverInteractionType;
  },
) {
  const { popoverInteractionKind, onClick, ...toolbarProps } = props;
  const [active, setActive] = useState<string | null>(null);

  return (
    <Toolbar popoverInteractionKind={popoverInteractionKind} {...toolbarProps}>
      {itemsPopover.map(({ content, ...itemProps }) => (
        <Toolbar.PopoverItem
          key={itemProps.id}
          content={content}
          itemProps={{
            ...itemProps,
            active: active === itemProps.id,
            onClick: () => {
              setActive(itemProps.id);
              onClick();
            },
          }}
        />
      ))}
    </Toolbar>
  );
}
PopoverItems.args = {
  popoverInteractionKind: 'click',
};
PopoverItems.argTypes = {
  popoverInteractionKind: {
    options: ['click', 'hover', 'click-target', 'hover-target'],
    control: { type: 'radio' },
  },
};

export function MixedItems(
  props: ToolbarItems & { onClick: () => void } & { popoverFirst: boolean } & {
    popoverInteractionKind: PopoverInteractionType;
  },
) {
  const { popoverInteractionKind, popoverFirst, onClick, ...toolbarProps } =
    props;
  const [active, setActive] = useState<string | null>(null);

  const set = new Set<number>([0, 1, 4, 6, 7]);
  const showPopover = (value: number) => popoverFirst === set.has(value);

  return (
    <Toolbar popoverInteractionKind={popoverInteractionKind} {...toolbarProps}>
      {itemsPopover.map(({ content, ...itemProps }, index) =>
        showPopover(index) ? (
          <Toolbar.PopoverItem
            key={itemProps.id}
            content={content}
            itemProps={{
              ...itemProps,
              active: active === itemProps.id,
              onClick: () => {
                setActive(itemProps.id);
                onClick();
              },
            }}
          />
        ) : (
          <Toolbar.Item
            key={itemProps.id}
            id={itemProps.id}
            title={itemProps.title}
            onClick={() => {
              setActive(itemProps.id);
              onClick();
            }}
            icon={itemProps.icon}
            active={active === itemProps.id}
          />
        ),
      )}
    </Toolbar>
  );
}
MixedItems.args = {
  popoverFirst: false,
  popoverInteractionKind: 'click',
};
MixedItems.argTypes = {
  popoverInteractionKind: {
    options: ['click', 'hover', 'click-target', 'hover-target'],
    control: { type: 'radio' },
  },
};
