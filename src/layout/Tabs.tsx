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

const background = {
  horizontal: 'linear-gradient(180deg, hsl(0deg, 0%, 97%), white)',
  vertical: 'linear-gradient(90deg, hsl(0deg, 0%, 97%), white)',
};

const styles = {
  item: (isSelected: boolean, orientation: TabsOrientation) => {
    return css([
      {
        padding: '0.5rem 2rem',
        border: '1px solid hsl(0deg, 0%, 80%)',
        fontSize: 14,
        ':focus': {
          outline: 'none',
        },
        ':hover': {
          backgroundColor: 'hsl(0deg, 0%, 97%)',
        },
      },
      isSelected && {
        background:
          orientation === 'horizontal'
            ? background.horizontal
            : background.vertical,
      },
      orientation === 'horizontal' && {
        margin: isSelected ? '0px 2px -1px 2px' : '0px 2px 0 2px',
        borderBottom: 'none',
      },
      orientation === 'vertical' && {
        margin: isSelected ? '2px -1px 2px 0px' : '2px 0px 2px 0px',
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
      <div style={{ marginLeft: 5 }}>{item.content}</div>
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
      <div>{item.content}</div>
    </div>
  );
}
