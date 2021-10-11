import { Meta } from '@storybook/react';
import React, { ReactNode, useState } from 'react';

import { Toolbar } from '../src';
import { ToolbarItemProps, ToolbarProps } from '../src/layout/Toolbar';

export default {
  title: 'Layout/Toolbar',
} as Meta<ToolbarProps>;

const items: Array<{ children: ReactNode; title: string; id: string }> = [
  { id: 'copy', children: 'c', title: 'Copy' },
  { id: 'paste', children: 'v', title: 'Paste' },
];

export function VerticalToolbar() {
  const [state, setState] = useState(items[1]);

  function handleChange({ id, children, title }: ToolbarItemProps) {
    setState({ id, children, title });
  }

  return (
    <div style={{ display: 'flex', height: 90 }}>
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
  );
}

export function HorizontalToolbar() {
  const [state, setState] = useState(items[1]);

  function handleChange({ id, children, title }: ToolbarItemProps) {
    setState({ id, children, title });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 100 }}>
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
  );
}

export function TestV() {
  return (
    <div style={{ height: 300 }}>
      <Toolbar orientation="vertical">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Toolbar.Item key={index} id={String(index)} title={String(index)}>
              {index}
            </Toolbar.Item>
          ))}
      </Toolbar>
    </div>
  );
}
