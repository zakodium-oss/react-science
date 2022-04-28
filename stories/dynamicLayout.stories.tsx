import { Meta } from '@storybook/react';
import React from 'react';

import { RootLayout } from '../src';
import { DynamicLayout, Layout } from '../src/layout/DynamicLayout';

export default {
  title: 'Layout/DynamicLayout',
  component: RootLayout,
} as Meta;

const layout: Layout = {
  key: 'hxulp',
  component: 'SplitPane',
  orientation: 'horizontal',
  children: [
    {
      key: 'a',
      component: 'Accordion',
      children: [
        {
          key: 'a1',
          component: VioletBackground,
          title: 'Accordion 1',
          defaultOpened: true,
        },
        {
          key: 'a2',
          component: PinkBackground,
          title: 'Accordion 2',
        },
      ],
    },
    {
      key: 'b',
      component: 'SplitPane',
      orientation: 'vertical',
      children: [
        {
          key: 'b1',
          component: 'SplitPane',
          orientation: 'horizontal',
          children: [
            {
              key: 'b1.1',
              component: BlueBackground,
            },
            {
              key: 'b1.2',
              component: 'SplitPane',
              orientation: 'horizontal',
              children: [
                {
                  key: 'b1.2.1',
                  component: YellowBackground,
                },
                {
                  key: 'b1.2.2',
                  component: 'Accordion',

                  children: [
                    {
                      key: 'b1.2.2.1',
                      component: VioletBackground,
                      title: 'Accordion a',
                    },
                    {
                      key: 'b1.2.2.2',
                      component: PinkBackground,
                      title: 'Accordion g',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          key: 'b2',
          component: GreenBackground,
        },
      ],
    },
  ],
};

function GreenBackground() {
  return (
    <div style={{ backgroundColor: 'green', width: '100%', minHeight: '5em' }}>
      Test
    </div>
  );
}
function YellowBackground() {
  return (
    <div
      style={{ backgroundColor: 'yellow', width: '100%', minHeight: '5em' }}
    />
  );
}
function BlueBackground() {
  return (
    <div style={{ backgroundColor: 'blue', width: '100%', minHeight: '5em' }} />
  );
}
function VioletBackground() {
  return (
    <div
      style={{
        backgroundColor: 'violet',
        width: '100%',
        minHeight: '5em',
        height: '100%',
      }}
    >
      Test
    </div>
  );
}

function PinkBackground() {
  return (
    <div style={{ backgroundColor: 'pink', width: '100%', minHeight: '5em' }} />
  );
}

export function test() {
  return <DynamicLayout layout={layout} />;
}
