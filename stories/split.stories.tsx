import { Meta } from '@storybook/react';
import React from 'react';

import { SplitPane } from '../src';

export default {
  title: 'Layout/SplitPane',
} as Meta;

export function Vertical() {
  return (
    <div style={{ backgroundColor: 'green', height: 400 }}>
      <SplitPane orientation="vertical" initialSeparation="200px">
        <div>A</div>
        <div>B</div>
      </SplitPane>
    </div>
  );
}

export function Horizontal() {
  return (
    <div style={{ backgroundColor: 'yellow', height: 200 }}>
      <SplitPane orientation="horizontal" initialSeparation="20%">
        <div>A</div>
        <div>B</div>
      </SplitPane>
    </div>
  );
}

export function Inception() {
  return (
    <div style={{ backgroundColor: 'cyan', height: 400 }}>
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
