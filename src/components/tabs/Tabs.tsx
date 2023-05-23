/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode, useMemo } from 'react';

import { TabsProvider, useTabsContext } from './TabsContext';

type TabsOrientation = 'vertical' | 'horizontal';

export interface TabItem<T extends string = string> {
  id: T;
  title: ReactNode;
  content: ReactNode;
}

interface TabsItemProps {
  onClick: () => void;
  title: ReactNode;
  id: string;
}

interface TabsProps<T extends string = string> {
  opened?: T;
  orientation?: TabsOrientation;
  items: Array<TabItem<T>>;
  onClick?: (id: T) => void;
}

const styles = {
  scroll: css({
    '&::-webkit-scrollbar': {
      height: '7px',
      width: '7px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(0,0,0,.05)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.2)',
    },
  }),
  item: (isSelected: boolean, orientation: TabsOrientation) => {
    return css([
      {
        padding: '0.25em 1em',
        border: '1px solid hsl(0deg, 0%, 80%)',
        fontSize: '1.125em',
        ':hover': {
          backgroundColor: 'hsl(0deg, 0%, 90%)',
        },
        whiteSpace: 'nowrap',
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

export function Tabs<T extends string = string>(props: TabsProps<T>) {
  const { orientation = 'horizontal', items, onClick, opened } = props;
  const item = useMemo(
    () => items.find(({ id: itemId }) => itemId === opened),
    [items, opened],
  );
  if (orientation === 'horizontal') {
    return (
      <TabsProvider opened={item}>
        <TabsHorizontal items={items} onClick={onClick} />
      </TabsProvider>
    );
  }

  return (
    <TabsProvider opened={item}>
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
      css={styles.item(item?.id === props.id, props.orientation)}
    >
      {props.title}
    </button>
  );
}

function TabsVertical<T extends string = string>(
  props: Omit<TabsProps<T>, 'orientation' | 'opened'>,
) {
  const { items, onClick } = props;
  const item = useTabsContext();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flex: '1 1 0%',
        overflowY: 'hidden',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid hsl(0deg, 0%, 80%)',
          overflowY: 'auto',
        }}
        css={styles.scroll}
      >
        {items.map((item) => (
          <TabsItem
            orientation="vertical"
            key={item.id}
            title={item.title}
            id={item.id}
            onClick={() => {
              onClick?.(item.id);
            }}
          />
        ))}
      </div>
      {item && (
        <div style={{ flex: '1 1 0%', overflowX: 'auto' }}>{item.content}</div>
      )}
    </div>
  );
}

function TabsHorizontal<T extends string = string>(
  props: Omit<TabsProps<T>, 'orientation' | 'opened'>,
) {
  const { items, onClick } = props;
  const item = useTabsContext();
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden', height: '100%' }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderBottom: '1px solid hsl(0deg, 0%, 80%)',
          overflowX: 'auto',
        }}
        css={styles.scroll}
      >
        {items.map((item) => (
          <TabsItem
            key={item.id}
            orientation="horizontal"
            id={item.id}
            title={item.title}
            onClick={() => {
              onClick?.(item.id);
            }}
          />
        ))}
      </div>
      {item && (
        <div style={{ flex: '1 1 0%', overflowX: 'auto' }}>{item.content}</div>
      )}
    </div>
  );
}
