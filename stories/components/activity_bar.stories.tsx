import type { Meta } from '@storybook/react';
import type { ReactElement } from 'react';
import { useState } from 'react';

import type {
  ActivityBarItemProps,
  ActivityBarProps,
  ToolbarProps,
} from '../../src/components/index.js';
import {
  ActivityBar,
  ActivityBarItem,
  ActivityPanel,
  SplitPane,
} from '../../src/components/index.js';

export default {
  title: 'Components / Activity bar and panel',
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

export function ActivityBarControl(
  props: ActivityBarProps & { onClick: () => void },
) {
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

export function ActivityToolbarLayout() {
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
          <SplitPane defaultSize="30%" controlledSide="end">
            <PlaceHolder />
            <ActivityPanel>
              {itemsBlueprintIcons
                .filter(({ id }) => selected.includes(id))
                .map(({ id }) => (
                  <ActivityPanel.Item
                    key={id}
                    title={id}
                    onClose={() =>
                      setSelected((prev) => prev.filter((i) => i !== id))
                    }
                  >
                    <div>
                      This is the content of <strong>{id}</strong>.
                    </div>
                  </ActivityPanel.Item>
                ))}
            </ActivityPanel>
          </SplitPane>
        ) : (
          <PlaceHolder />
        )}
      </div>
      <div
        style={{
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
