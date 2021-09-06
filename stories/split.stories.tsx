import { Meta } from '@storybook/react';
import React from 'react';

import { SplitPane } from '../src';

export default {
  title: 'Layout/SplitPane',
} as Meta;

export function vertical() {
  return (
    <SplitPane orientation="vertical" initialSeparation="150px">
      <div>A</div>
      <div>B</div>
    </SplitPane>
  );
}

export function horizontal() {
  return (
    <div style={{ backgroundColor: 'green' }}>
      <SplitPane orientation="horizontal" initialSeparation="150px">
        <div>A</div>
        <div>B</div>
      </SplitPane>
    </div>
  );
}
