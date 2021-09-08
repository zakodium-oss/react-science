import { Meta } from '@storybook/react';
import React, { useRef } from 'react';

import { SplitPane } from '../src';

export default {
  title: 'Layout/SplitPane',
} as Meta;

export function Vertical() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} style={{ backgroundColor: 'green' }}>
      <SplitPane
        parentRef={ref}
        orientation="vertical"
        initialSeparation="200px"
      >
        <div>A</div>
        <div>B</div>
      </SplitPane>
    </div>
  );
}

export function Horizontal() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} style={{ backgroundColor: 'green' }}>
      <SplitPane
        parentRef={ref}
        orientation="horizontal"
        initialSeparation="30%"
      >
        <div>A</div>
        <div>B</div>
      </SplitPane>
    </div>
  );
}
