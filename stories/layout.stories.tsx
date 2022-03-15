import { Meta } from '@storybook/react';
import React from 'react';

import { RootLayout } from '../src';

export default {
  title: 'Layout/RootLayout',
  component: RootLayout,
} as Meta;

export function test() {
  return (
    <RootLayout>
      <div />
    </RootLayout>
  );
}
