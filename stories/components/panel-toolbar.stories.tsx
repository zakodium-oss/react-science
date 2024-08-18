import { useState } from 'react';

import { Toolbar, ToolbarItemProps } from '../../src/components';

export default {
  title: 'Components / Panel Toolbar',
  component: Toolbar,
};

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
export function Basic() {
  const [selected, setSelected] = useState('copy');
  return (
    <div
      style={{
        height: 300,
        display: 'flex',
      }}
    >
      <div>
        <Toolbar vertical large>
          {itemsBlueprintIcons.map((item) => (
            <Toolbar.Item
              key={item.id}
              id={item.id}
              icon={item.icon}
              active={selected === item.id}
              onClick={() => setSelected(item.id)}
            />
          ))}
        </Toolbar>
      </div>
      <div>{selected}</div>
    </div>
  );
}
