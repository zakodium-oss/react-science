import { Meta } from '@storybook/react';
import React, { ReactNode, useState } from 'react';

import { Toolbar, RootLayout } from '../src';
import { ToolbarItemProps, ToolbarProps } from '../src/layout/ToolbarLayout';

export default {
  title: 'Layout/Toolbar',
} as Meta<ToolbarProps>;

const items: Array<{ children: ReactNode; title: string; id: string }> = [
  { id: 'copy', children: 'c', title: 'Copy' },
  { id: 'paste', children: 'v', title: 'Paste' },
  { id: 'undo', children: 'b', title: 'Undo' },
  { id: 'redo', children: 'f', title: 'Redo' },
];

export function VerticalToolbar() {
  const [state, setState] = useState(items[1]);

  function handleChange({ id, children, title }: ToolbarItemProps) {
    setState({ id, children, title });
  }

  return (
    <RootLayout>
      <div style={{ display: 'flex' }}>
        <Toolbar orientation="vertical">
          {items.map((item) => (
            <Toolbar.Item
              key={item.id}
              id={item.id}
              title={item.title}
              active={state.title === item.title}
              onClick={handleChange}
            >
              {item.children}
            </Toolbar.Item>
          ))}
        </Toolbar>
        <div style={{ padding: 5 }}>
          <p>Hello, World!</p>
          <p>Value selected: {state.title}</p>
        </div>
      </div>
    </RootLayout>
  );
}

export function HorizontalToolbar() {
  const [state, setState] = useState(items[1]);

  function handleChange({ id, children, title }: ToolbarItemProps) {
    setState({ id, children, title });
  }

  return (
    <RootLayout>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Toolbar orientation="horizontal">
          {items.map((item) => (
            <Toolbar.Item
              key={item.id}
              id={item.id}
              title={item.title}
              active={state.id === item.id}
              onClick={handleChange}
            >
              {item.children}
            </Toolbar.Item>
          ))}
        </Toolbar>
        <div style={{ padding: 5 }}>
          <p>Hello, World!</p>
          <p>Value selected: {state.title}</p>
        </div>
      </div>
    </RootLayout>
  );
}
