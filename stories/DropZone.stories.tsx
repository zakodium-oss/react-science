import { Meta } from '@storybook/react';
import React from 'react';

import DropZone from '../src/layout/DropZone';

export default {
  title: 'Layout/DropZone',
} as Meta;
export function TestDropZone() {
  return <DropZone />;
}
