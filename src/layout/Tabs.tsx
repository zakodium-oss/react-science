/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';

import { TabsProvider, useTabsContext } from './context/TabsContext';

type TabsOrientation = 'vertical' | 'horizontal';

export interface TabItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
}

interface TabsItemProps {
  onClick: () => void;
  title: ReactNode;
  id: string;
}

interface TabsProps {
  opened: TabItem;
  orientation?: TabsOrientation;
  items: Array<TabItem>;
  onClick?: (item: TabItem) => void;
}

const styles = {
  item: (isSelected: boolean, orientation: TabsOrientation) => {
    return css([
      {
        padding: '0.5rem 2rem',
        border: '1px solid hsl(0deg, 0%, 80%)',
        fontSize: 14,
        ':hover': {
          backgroundColor: 'hsl(0deg, 0%, 90%)',
        },
      },
      isSelected && {
        backgroundColor: 'hsl(0deg, 0%, 95%)',
        ':hover': {
          backgroundColor: 'hsl(0deg, 0%, 90%)',
        },
      },
      orientation === 'horizontal' && {
        margin: '0px 2px 0px 2px',
        borderBottom: 'none',
      },
      orientation === 'vertical' && {
        margin: '2px 0px 2px 0px',
        borderRight: 'none',
      },
    ]);
  },
};

export function Tabs(props: TabsProps) {
  const { orientation = 'horizontal', items, onClick, opened } = props;

  if (orientation === 'horizontal') {
    return (
      <TabsProvider opened={opened}>
        <TabsHorizontal items={items} onClick={onClick} />
      </TabsProvider>
    );
  }

  return (
    <TabsProvider opened={opened}>
      <TabsVertical items={items} onClick={onClick} />
    </TabsProvider>
  );
}

function TabsItem(props: TabsItemProps & { orientation: TabsOrientation }) {
  const item = useTabsContext();

  return (
    <button
      type="button"
      onClick={props.onClick}
      css={styles.item(item.id === props.id, props.orientation)}
    >
      {props.title}
    </button>
  );
}

function TabsVertical(props: Omit<TabsProps, 'orientation' | 'opened'>) {
  const item = useTabsContext();

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid hsl(0deg, 0%, 80%)',
        }}
      >
        {props.items.map((item) => (
          <TabsItem
            orientation="vertical"
            key={item.id}
            title={item.title}
            id={item.id}
            onClick={() => {
              props.onClick?.(item);
            }}
          />
        ))}
      </div>
      <div style={{ marginLeft: 5, flex: '1 1 0%' }}>{item.content}</div>
    </div>
  );
}

function TabsHorizontal(props: Omit<TabsProps, 'orientation' | 'opened'>) {
  const item = useTabsContext();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 38,
          borderBottom: '1px solid hsl(0deg, 0%, 80%)',
        }}
      >
        {props.items.map((item) => (
          <TabsItem
            key={item.id}
            orientation="horizontal"
            id={item.id}
            title={item.title}
            onClick={() => {
              props.onClick?.(item);
            }}
          />
        ))}
      </div>
      <div style={{ flex: '1 1 0%' }}>{item.content}</div>
    </div>
  );
}
