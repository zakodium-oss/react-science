import { Meta } from '@storybook/react';
import React from 'react';

import DropZone from '../src/layout/DropZone';

export default {
  title: 'Layout/DropZone',
} as Meta;

export function TestDropZone() {
  return <DropZone color="red" />; //we can add a color prop or it's black in default
}
