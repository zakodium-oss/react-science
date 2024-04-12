import { Button, Menu, MenuItem, Popover, Tooltip } from '@blueprintjs/core';
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
import {
  TooltipItem,
  TooltipHelpContent,
} from '../../src/components/toolbar/TooltipHelpContent';

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
  Pick<ToolbarItemProps, 'tooltip' | 'icon' | 'disabled'> & {
    id: string;
    content?: JSX.Element;
  }
>;

const itemsBlueprintIcons: ToolbarItems = [
  { id: 'copy', icon: 'phone', tooltip: 'Phone' },
  { id: 'paste', icon: 'add-column-left', tooltip: 'Add left' },
  { id: 'undo', icon: 'add-column-right', tooltip: 'Right' },
  {
    id: 'redo',
    icon: 'redo',
    tooltip: 'Redo',
  },
  { id: 'test1', icon: 'undo', tooltip: 'Undo' },
  { id: 'test2', icon: 'paperclip', tooltip: 'Attachment' },
  { id: 'test3', icon: 'help', tooltip: 'Help' },
  { id: 'test4', icon: 'lab-test', tooltip: 'Lab', disabled: true },
  { id: 'test5', icon: 'trash', tooltip: 'Trash' },
];

const itemsMixedIcons: ToolbarItems = [
  {
    id: 'paperclip-blueprint',
    icon: 'paperclip',
    tooltip: 'BlueprintJS paperclip icon',
  },
  {
    id: 'paperclip-fa',
    icon: <FaPaperclip />,
    tooltip: 'Fontawesome paperclip icon',
  },
  {
    id: 'paperclip-hi-2',
    icon: <HiOutlinePaperClip />,
    tooltip: 'Heroicons 2 paperclip icon',
  },
  {
    id: 'paperclip-bi',
    icon: <BiPaperclip />,
    tooltip: 'Box icons paperclip icon',
  },
  {
    id: 'clipboard-blueprint',
    icon: 'clipboard',
    tooltip: 'BlueprintJS paperclip icon',
  },
  {
    id: 'clipboard-fontawesome',
    icon: <FaClipboard />,
    tooltip: 'Fontawesome clipboard icon',
  },

  {
    id: 'clipboard-hi-2',
    icon: <HiClipboard />,
    tooltip: 'Heroicons 2 clipboard icon',
  },
  {
    id: 'clipboard-bi',
    icon: <BiClipboard />,
    tooltip: 'Box icons clipboard icon',
  },
  {
    id: 'credit-card-blueprint',
    icon: 'credit-card',
    tooltip: 'BlueprintJS credit-card icon',
  },
  {
    id: 'credit-card-fa',
    icon: <FaCreditCard />,
    tooltip: 'Fontawesome credit card icon',
  },
  {
    id: 'credit-card-hi2',
    icon: <HiCreditCard />,
    tooltip: 'Heroicons credit card icon',
  },
  {
    id: 'credit-card-bi',
    icon: <BiCreditCard />,
    tooltip: 'Box icons credit card icon',
    disabled: true,
  },
];

const itemsPopover: ToolbarItems = [
  {
    id: 'clipboard-bi',
    icon: <BiClipboard />,
    tooltip: 'Box icons clipboard icon',
    content: (
      <Menu>
        <MenuItem text="Box icons clipboard icon" />
      </Menu>
    ),
  },
  {
    id: 'paste',
    icon: 'add-column-left',
    tooltip: 'Add left',
    content: (
      <Menu>
        <MenuItem text="Add left" />
      </Menu>
    ),
  },
  {
    id: 'paperclip-bi',
    icon: <BiPaperclip />,
    tooltip: 'Box icons paperclip icon',
    content: (
      <Menu>
        <MenuItem text="Box icons paperclip icon" />
      </Menu>
    ),
  },
  {
    id: 'clipboard-blueprint',
    icon: 'clipboard',
    tooltip: 'BlueprintJS paperclip icon',
    content: (
      <Menu>
        <MenuItem text="BlueprintJS paperclip icon" />
      </Menu>
    ),
  },
  {
    id: 'credit-card-bi',
    icon: <BiCreditCard />,
    tooltip: 'Box icons credit card icon',
    content: (
      <Menu>
        <MenuItem text="Box icons credit card icon" />
      </Menu>
    ),
  },
  {
    id: 'credit-card-blueprint',
    icon: 'credit-card',
    tooltip: 'BlueprintJS credit-card icon',
    content: (
      <Menu>
        <MenuItem text="BlueprintJS credit-card icon" />
      </Menu>
    ),
  },
  {
    id: 'clipboard-hi-2',
    icon: <HiClipboard />,
    tooltip: 'Heroicons 2 clipboard icon',
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
          tooltip={item.tooltip}
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
          tooltip={item.tooltip}
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
  function handleChange({ id, icon, tooltip }: ToolbarItemProps) {
    setState({ id: id as string, icon, tooltip });
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
            tooltip={item.tooltip}
            active={state.tooltip === item.tooltip}
            onClick={handleChange}
            icon={item.icon}
          />
        ))}
        <Toolbar.Item tooltip="Inbox" icon="inbox" />
      </Toolbar>
      <div style={{ padding: 5 }}>
        <p>Hello, World!</p>
        <p>Value selected: {state.tooltip}</p>
      </div>
    </div>
  );
}

export function Horizontal() {
  const [state, setState] = useState(itemsBlueprintIcons[1]);

  function handleChange({ id, icon, tooltip }: ToolbarItemProps) {
    setState({ id: id as string, icon, tooltip });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Toolbar intent="primary" disabled={false}>
        {itemsBlueprintIcons.map((item) => (
          <Toolbar.Item
            key={item.id}
            id={item.id}
            tooltip={item.tooltip}
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
        <p>Value selected: {state.tooltip}</p>
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
            tooltip={itemProps.tooltip}
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

const itemsShortcuts: Array<
  TooltipItem & { id: string; icon: ToolbarItemProps['icon'] }
> = [
  {
    id: 'copy',
    icon: 'phone',
    title: 'Copy text tool',
    shortcuts: ['Ctrl', 'C'],
    description: 'Copy selected item to clipboard.',
  },
  {
    id: 'paste',
    icon: 'add-column-left',
    title: 'Paste text tool',
    shortcuts: ['Ctrl', 'V'],
    description: 'Paste copied item from clipboard.',
  },
  {
    id: 'undo',
    icon: 'add-column-right',
    title: 'Undo text tool',
    shortcuts: ['Ctrl', 'Z'],
    description: 'Undo the last action.',
  },
  {
    id: 'redo',
    icon: 'redo',
    title: 'Redo text tool',
    shortcuts: ['Ctrl', 'Y'],
    description: 'Redo the previously undone action.',
  },
  {
    id: 'cut',
    icon: 'cut',
    title: 'Cut text tool',
    shortcuts: ['Ctrl', 'X'],
    description: 'Cut selected item to clipboard.',
  },
];

export function CustomTooltipContent() {
  return (
    <div
      style={{
        display: 'flex',
        height: 200,
      }}
    >
      <Toolbar vertical>
        {itemsShortcuts.map((item) => (
          <Toolbar.Item
            key={item.id}
            id={item.id}
            tooltip={<TooltipHelpContent {...item} />}
            icon={item.icon}
            tooltipProps={{ minimal: true }}
          />
        ))}
        <Toolbar.Item tooltip="Inbox" icon="inbox" />
      </Toolbar>
    </div>
  );
}

export function TooltipHelpContentStory() {
  return (
    <Tooltip
      minimal
      isOpen
      content={
        <TooltipHelpContent
          title="Cut text tool"
          shortcuts={['Ctrl', 'x']}
          subTitles={[
            {
              title: 'sub title 1',
              shortcuts: ['x'],
            },
            {
              title: 'sub title 2',
              shortcuts: ['z'],
            },
          ]}
          description="Cut selected item to clipboard."
        />
      }
    />
  );
}

TooltipHelpContentStory.storyName = 'TooltipHelpContent';
