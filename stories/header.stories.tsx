import { Meta } from '@storybook/react';
import React from 'react';

import { RootLayout, HeaderLayout, Toolbar } from '../src';

export default {
  title: 'Layout/Header',
} as Meta;

export function control() {
  return (
    <RootLayout
      style={{
        borderStyle: 'solid',
        borderColor: 'rgb(213, 213, 213)',
        borderWidth: '1px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <HeaderLayout>
          <Toolbar orientation="horizontal">
            <Toolbar.Item titleOrientation="horizontal" id="logo" title="Logo">
              Logo
            </Toolbar.Item>
          </Toolbar>
          <Toolbar orientation="horizontal">
            <Toolbar.Item id="a" title="A">
              A
            </Toolbar.Item>
            <Toolbar.Item id="b" title="B">
              B
            </Toolbar.Item>
            <Toolbar.Item id="c" title="C">
              C
            </Toolbar.Item>
          </Toolbar>
        </HeaderLayout>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div>
          <Toolbar orientation="vertical">
            <Toolbar.Item id="a" title="A" active>
              A
            </Toolbar.Item>
            <Toolbar.Item id="b" title="B">
              B
            </Toolbar.Item>
          </Toolbar>
        </div>
        <div
          style={{
            padding: 5,
            width: '100%',
          }}
        >
          <p>content</p>
        </div>
      </div>
    </RootLayout>
  );
}
