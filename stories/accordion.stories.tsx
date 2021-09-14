import { Meta } from '@storybook/react';
import React from 'react';

import { Accordion, RootLayout, Toolbar } from '../src';

export default {
  title: 'Layout/Accordion',
} as Meta;

export function control() {
  return (
    <RootLayout>
      <div
        style={{
          display: 'flex',
          width: 500,
          height: 300,
        }}
      >
        <Toolbar orientation="vertical">
          <Toolbar.Item id="C" title="C" active onClick={() => {}}>
            C
          </Toolbar.Item>
          <Toolbar.Item id="V" title="V" active={false} onClick={() => {}}>
            V
          </Toolbar.Item>
        </Toolbar>
        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <Accordion>
            <Accordion.Item title="First Item" defaultOpened>
              This is the content of the first item
            </Accordion.Item>
            <Accordion.Item title="Second Item">
              This is the content of the second item
            </Accordion.Item>
            <Accordion.Item title="With Toolbar">
              <Toolbar orientation="horizontal">
                <Toolbar.Item id="A" title="Test A">
                  A
                </Toolbar.Item>
                <Toolbar.Item id="B" title="Test B">
                  B
                </Toolbar.Item>
              </Toolbar>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </RootLayout>
  );
}
