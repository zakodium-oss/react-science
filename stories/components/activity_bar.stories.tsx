import type { Meta } from '@storybook/react';
import { type ReactElement, useState } from 'react';

import {
  ActivityBar,
  ActivityBarItem,
  type ActivityBarItemProps,
  type ActivityBarProps,
  type ToolbarProps,
} from '../../src/components/index.js';

export default {
  title: 'Components / ActivityBar',
  component: ActivityBar,
  argTypes: {
    onClick: { action: 'handle' },
  },
} as Meta<ToolbarProps>;

type ActivityBarStoryItem = Pick<
  ActivityBarItemProps,
  'tooltip' | 'icon' | 'disabled'
> & {
  id: string;
  content?: ReactElement;
};

const itemsBlueprintIcons: ActivityBarStoryItem[] = [
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

export function Control(props: ActivityBarProps & { onClick: () => void }) {
  const { onClick, ...activityBarProps } = props;
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      style={{
        border: '1px solid #f7f7f7',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
      }}
    >
      <ActivityBar {...activityBarProps}>
        {itemsBlueprintIcons.map((item) => (
          <ActivityBarItem
            key={item.id}
            {...item}
            onClick={() => {
              setActive(item.id);
              onClick();
            }}
            active={item.id === active}
          />
        ))}
      </ActivityBar>
    </div>
  );
}
