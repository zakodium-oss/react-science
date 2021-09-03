import { Meta } from '@storybook/react';
import React from 'react';

import { AccordionLayout, RootLayout, Toolbar } from '../src';

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
          <AccordionLayout>
            <AccordionLayout.Item title="First Item" defaultOpened>
              This is the content of the first item
            </AccordionLayout.Item>
            <AccordionLayout.Item title="Second Item">
              This is the content of the second item
            </AccordionLayout.Item>
          </AccordionLayout>
        </div>
      </div>
    </RootLayout>
  );
}
