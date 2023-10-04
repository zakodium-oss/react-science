import { ButtonProps } from '@blueprintjs/core';
import { Meta } from '@storybook/react';
import { useState } from 'react';
import { BiClipboard, BiCreditCard, BiPaperclip } from 'react-icons/bi';
import { FaClipboard, FaCreditCard, FaPaperclip } from 'react-icons/fa6';
import { HiClipboard, HiCreditCard, HiOutlinePaperClip } from 'react-icons/hi2';

import { Toolbar, ToolbarItemProps, ToolbarProps } from '../../src/components';

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

type ToolbarItems = Array<{
  icon: ButtonProps['icon'];
  title: string;
  id: string;
}>;

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
  { id: 'test4', icon: 'lab-test', title: 'Lab' },
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
        />
      ))}
    </Toolbar>
  );
}

export function VerticalToolbar() {
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

export function HorizontalToolbar() {
  const [state, setState] = useState(itemsBlueprintIcons[1]);

  function handleChange({ id, icon, title }: ToolbarItemProps) {
    setState({ id: id as string, icon, title });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Toolbar>
        {itemsBlueprintIcons.map((item) => (
          <Toolbar.Item
            key={item.id}
            id={item.id}
            title={item.title}
            active={state.id === item.id}
            onClick={handleChange}
            icon={item.icon}
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
