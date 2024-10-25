import { Menu, MenuItem, Tooltip, Card, Colors } from '@blueprintjs/core';
import type { Meta } from '@storybook/react';
import { type ReactElement, useState } from 'react';
import { BiClipboard, BiCreditCard, BiPaperclip } from 'react-icons/bi';
import { FaClipboard, FaCreditCard, FaPaperclip } from 'react-icons/fa6';
import { HiClipboard, HiCreditCard, HiOutlinePaperClip } from 'react-icons/hi2';

import {
  ActivityBar,
  ActivityBarItem,
  Button,
  SplitPane,
  Toolbar,
  TooltipHelpContent,
  type PopoverInteractionType,
  type ToolbarItemProps,
  type ToolbarProps,
  type TooltipItem,
} from '../../src/components/index.js';

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
    intent: {
      options: ['none', 'primary', 'success', 'warning', 'danger'],
      control: { type: 'select' },
    },
  },
} as Meta<ToolbarProps>;

type ToolbarItems = Array<
  Pick<ToolbarItemProps, 'tooltip' | 'icon' | 'disabled'> & {
    id: string;
    content?: ReactElement;
  }
>;

const itemsBlueprintIcons: ToolbarItems = [
  { id: 'phone', icon: 'phone', tooltip: 'Phone' },
  { id: 'add-column-left', icon: 'add-column-left', tooltip: 'Add left' },
  { id: 'add-column-right', icon: 'add-column-right', tooltip: 'Right' },
  {
    id: 'redo',
    icon: 'redo',
    tooltip: 'Redo',
  },
  { id: 'undo', icon: 'undo', tooltip: 'Undo' },
  { id: 'paperclip', icon: 'paperclip', tooltip: 'Attachment' },
  { id: 'help', icon: 'help', tooltip: 'Help' },
  { id: 'lab-test', icon: 'lab-test', tooltip: 'Lab', disabled: true },
  { id: 'trash', icon: 'trash', tooltip: 'Trash' },
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
  {
    id: 'custom',
    icon: <span>BC</span>,
    tooltip: 'Custom icon',
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
  {
    id: 'custom',
    icon: <span>BC</span>,
    tooltip: 'Custom icon',
    content: (
      <Menu>
        <MenuItem text="Custom icon" />
      </Menu>
    ),
  },
];

export function Control(props: ToolbarProps & { onClick: () => void }) {
  const { onClick, ...toolbarProps } = props;
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: props.vertical ? 'row' : 'column',
        border: '1px solid #f7f7f7',
        width: '100%',
        height: 800,
      }}
    >
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
        <Toolbar.PopoverItem
          content={
            <Menu>
              <MenuItem text="Item 1" />
              <MenuItem text="Item 2" />
            </Menu>
          }
          itemProps={{
            id: 'popover',
            icon: 'more',
            tooltip: 'More',
          }}
        />
      </Toolbar>
    </div>
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
            undefined
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
  props: ToolbarProps & { onClick: () => void } & {
    popoverInteractionKind: PopoverInteractionType;
  },
) {
  const { popoverInteractionKind, onClick, ...toolbarProps } = props;
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      style={{
        height: 800,
      }}
    >
      <Toolbar
        popoverInteractionKind={popoverInteractionKind}
        {...toolbarProps}
      >
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
              tag: itemProps.id.startsWith('credit-card')
                ? 1
                : itemProps.id.startsWith('clipboard')
                  ? 15
                  : undefined,
            }}
          />
        ))}
      </Toolbar>
    </div>
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
  props: ToolbarProps & { onClick: () => void } & { popoverFirst: boolean } & {
    popoverInteractionKind: PopoverInteractionType;
  },
) {
  const { popoverInteractionKind, popoverFirst, onClick, ...toolbarProps } =
    props;
  const [active, setActive] = useState<string | null>(null);

  const set = new Set<number>([0, 1, 4, 6, 7]);
  const showPopover = (value: number) => popoverFirst === set.has(value);

  return (
    <div>
      <Toolbar
        popoverInteractionKind={popoverInteractionKind}
        {...toolbarProps}
      >
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
    </div>
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

export function CustomTooltipContent({ intent }: ToolbarProps) {
  return (
    <div
      style={{
        display: 'flex',
        height: 200,
      }}
    >
      <Toolbar vertical intent={intent}>
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

export function TooltipHelpContentStory({ intent }: ToolbarProps) {
  return (
    <div>
      <Tooltip
        minimal
        intent={intent}
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
    </div>
  );
}

TooltipHelpContentStory.storyName = 'TooltipHelpContent';

const PlaceHolder = () => (
  <div
    style={{
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(147, 197, 253)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 24,
    }}
  >
    Place Holder
  </div>
);
export function ActivityToolbar() {
  const [selected, setSelected] = useState<string[]>([
    'phone',
    'add-column-left',
  ]);

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
      }}
    >
      <div
        style={{
          flexGrow: 1,
        }}
      >
        {selected.length > 0 ? (
          <SplitPane size="30%" controlledSide="end">
            <PlaceHolder />

            <div
              style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: Colors.LIGHT_GRAY5,
                gap: '5px',
              }}
            >
              {itemsBlueprintIcons
                .filter(({ id }) => selected.includes(id))
                .map(({ id }) => (
                  <Card
                    key={id}
                    style={{
                      padding: '10px',
                      flexGrow: 1,
                      display: 'flex',
                      backgroundColor: Colors.WHITE,
                      flexDirection: 'column',
                      borderRadius: 0,
                    }}
                    elevation={0}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #ddd',
                        paddingBottom: '8px',
                        marginBottom: '8px',
                      }}
                    >
                      <h4>{id}</h4>
                      <Button
                        minimal
                        icon="cross"
                        onClick={() =>
                          setSelected((prev) => prev.filter((i) => i !== id))
                        }
                      />
                    </div>

                    <div style={{ flexGrow: 1 }}>
                      This is the content of <strong>{id}</strong>.
                    </div>
                  </Card>
                ))}
            </div>
          </SplitPane>
        ) : (
          <PlaceHolder />
        )}
      </div>
      <div
        style={{
          boxShadow:
            'inset 0 0 0 1px rgba(17, 20, 24, 0.2), 0 1px 2px rgba(17, 20, 24, 0.1)',
          padding: 5,
          height: '100%',
          width: 'fit-content',
          display: 'flex',
          flexDirection: 'row-reverse',
          flexShrink: 1,
        }}
      >
        <ActivityBar>
          {itemsBlueprintIcons.map((item) => (
            <ActivityBarItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              active={selected.includes(item.id)}
              onClick={() => {
                setSelected((prev) =>
                  prev.includes(item.id)
                    ? prev.filter((id) => id !== item.id)
                    : [...prev, item.id],
                );
              }}
            />
          ))}
        </ActivityBar>
      </div>
    </div>
  );
}
