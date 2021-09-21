import { Meta } from '@storybook/react';
import React from 'react';

import { SplitPane } from '../src';
import { SplitPaneProps } from '../src/layout/SplitPane';

export default {
  title: 'Layout/SplitPane',
  args: {
    initialSeparation: '50%',
    orientation: 'horizontal',
    sideSeparation: 'end',
  },
  argTypes: {
    onChange: { action: 'handle' },
  },
  component: SplitPane,
} as Meta<SplitPaneProps>;

export function Control(props: Omit<SplitPaneProps, 'children'>) {
  return (
    <div style={{ backgroundColor: 'greenyellow', height: 400, width: 600 }}>
      <SplitPane key={props.initialSeparation} {...props}>
        <div>A</div>
        <div>B</div>
      </SplitPane>
    </div>
  );
}

export function Vertical() {
  return (
    <div style={{ backgroundColor: 'rgba(165, 180, 252)', height: 400 }}>
      <SplitPane orientation="vertical" initialSeparation="200px">
        <div>A</div>
        <div>B</div>
      </SplitPane>
    </div>
  );
}

export function Horizontal() {
  return (
    <div style={{ backgroundColor: 'rgba(147, 197, 253)', height: 200 }}>
      <SplitPane orientation="horizontal" initialSeparation="200px">
        <div>A</div>
        <div>B</div>
      </SplitPane>
    </div>
  );
}

export function Inception() {
  return (
    <div style={{ backgroundColor: 'rgba(209, 213, 219)', height: 400 }}>
      <SplitPane orientation="horizontal">
        <SplitPane orientation="vertical">
          <p>A</p>
          <p>B</p>
        </SplitPane>
        <SplitPane orientation="vertical">
          <p>C</p>
          <SplitPane orientation="vertical">
            <p>D</p>
            <p>E</p>
          </SplitPane>
        </SplitPane>
      </SplitPane>
    </div>
  );
}

export function WithEvilChild() {
  return (
    <div
      style={{
        backgroundColor: 'rgba(251, 207, 232)',
        width: 600,
        height: 300,
      }}
    >
      <SplitPane orientation="horizontal" initialSeparation="300px">
        <div>A</div>
        <div style={{ backgroundColor: 'rgba(252, 165, 165)', width: 300 }}>
          B
        </div>
      </SplitPane>
    </div>
  );
}
