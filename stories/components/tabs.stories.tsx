import { useState } from 'react';

import { Tabs, TabItem } from '@/components';

export default {
  title: 'Components / Tabs',
};

export function Horizontal() {
  const items: Array<TabItem> = [
    { id: '1h', title: '1H', content: 'Hello, World! [a]' },
    { id: '13c', title: '13C', content: 'Hello, World! [b]' },
    { id: '1h,1h', title: '1H,1H', content: 'Hello, World! [c]' },
    { id: '1h,13c', title: '1H,13C', content: 'Hello, World! [d]' },
  ];

  const [state, setState] = useState(items[1]);

  function handleClick(item: TabItem) {
    setState(item);
  }

  return (
    <Tabs
      orientation="horizontal"
      items={items}
      opened={state}
      onClick={handleClick}
    />
  );
}

export function Vertical() {
  const items: Array<TabItem> = [
    { id: 'controllers', title: 'Controllers', content: 'Hello, World!' },
    {
      id: 'formatting',
      title: 'Controllers a',
      content: 'Hello, World!',
    },
    { id: 'display', title: 'Controllers', content: 'Hello, World!' },
  ];

  const [state, setState] = useState(items[1]);

  function handleClick(item: TabItem) {
    setState(item);
  }

  return (
    <Tabs
      orientation="vertical"
      items={items}
      opened={state}
      onClick={handleClick}
    />
  );
}
