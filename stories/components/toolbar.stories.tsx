import { SvgBioDna } from 'cheminfo-font';
import { ReactNode, useState } from 'react';

import { Toolbar } from '../../src';
import { ToolbarItemProps } from '../../src/components/Toolbar';

export default {
  title: 'Components / Toolbar',
};

const items: Array<{ children: ReactNode; title: string; id: string }> = [
  { id: 'copy', children: 'c', title: 'Copy' },
  { id: 'paste', children: 'v', title: 'Paste' },
  { id: 'undo', children: 'b', title: 'Undo' },
  {
    id: 'redo',
    children: 'r',
    title: 'Redo',
  },
  { id: 'test1', children: 't', title: 'Test 1' },
  { id: 'test2', children: 't', title: 'Test 2' },
  { id: 'test3', children: 't', title: 'Test 3' },
  { id: 'test4', children: 't', title: 'Test 4' },
  { id: 'test5', children: 't', title: 'Test 5' },
];

export function VerticalToolbar(props: { height: number }) {
  const [state, setState] = useState(items[1]);

  function handleChange({ id, children, title }: ToolbarItemProps) {
    setState({ id, children, title });
  }

  return (
    <div
      style={{
        display: 'flex',
        height: props.height,
      }}
    >
      <div style={{ padding: 5 }}>
        <p>Something on the left</p>
      </div>
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
        <Toolbar.Item id="test" title="Test">
          <SvgBioDna style={{ width: 16, height: 16, display: 'block' }} />
        </Toolbar.Item>
      </Toolbar>
      <div style={{ padding: 5 }}>
        <p>Hello, World!</p>
        <p>Value selected: {state.title}</p>
      </div>
    </div>
  );
}

VerticalToolbar.args = {
  height: 200,
};

export function HorizontalToolbar() {
  const [state, setState] = useState(items[1]);

  function handleChange({ id, children, title }: ToolbarItemProps) {
    setState({ id, children, title });
  }

  return (
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
  );
}
