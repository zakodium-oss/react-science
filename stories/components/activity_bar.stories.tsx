import { Button } from '@blueprintjs/core';
import type { Meta } from '@storybook/react';
import type { ReactElement } from 'react';
import { Fragment, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import type {
  ActivityBarItemProps,
  ActivityBarProps,
  ToolbarProps,
} from '../../src/components/index.js';
import {
  Accordion,
  ActivityBar,
  ActivityBarItem,
  ActivityPanel,
  SplitPane,
} from '../../src/components/index.js';

import {
  AccordionStoryItem,
  AccordionStoryProvider,
} from './accordion_story_helpers.js';

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
  );
}

export function ActivityToolbarLayoutResizable() {
  const [selected, setSelected] = useState<string[]>([
    'phone',
    'add-column-left',
    'redo',
    'paperclip',
  ]);

  const displayedPanels = itemsBlueprintIcons.filter((item) =>
    selected.includes(item.id),
  );

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
            <PanelGroup direction="vertical">
              {displayedPanels.map(({ id }, idx) => (
                <Fragment key={id}>
                  <Panel key={id} id={id} minSize={10} order={idx}>
                    <ActivityPanel.Item
                      title={id}
                      onClose={() =>
                        setSelected((prev) => prev.filter((i) => i !== id))
                      }
                    >
                      <div>
                        This is the content of <strong>{id}</strong>.
                      </div>
                    </ActivityPanel.Item>
                  </Panel>
                  <PanelResizeHandle id={id} />
                </Fragment>
              ))}
            </PanelGroup>
          </SplitPane>
        ) : (
          <PlaceHolder />
        )}
      </div>
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
  );
}

export function ActivityToolbarLayoutWithAccordions() {
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
            <AccordionStoryProvider
              initialOpenItems={itemsBlueprintIcons.map((item) => item.id)}
            >
              <Accordion>
                {itemsBlueprintIcons
                  .filter((item) => selected.includes(item.id))
                  .map(({ id }) => (
                    <AccordionStoryItem
                      key={id}
                      id={id}
                      title={id}
                      renderToolbar={({ id }) => (
                        <Button
                          onClick={() => {
                            setSelected((prev) =>
                              prev.filter((listId) => listId !== id),
                            );
                          }}
                          icon="cross"
                          variant="minimal"
                        />
                      )}
                    >
                      <div>
                        This is the content of <strong>{id}</strong>.
                      </div>
                    </AccordionStoryItem>
                  ))}
              </Accordion>
            </AccordionStoryProvider>
          </SplitPane>
        ) : (
          <PlaceHolder />
        )}
      </div>
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
  );
}
