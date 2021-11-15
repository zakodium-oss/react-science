import { Meta } from '@storybook/react';
import React from 'react';

import PlotXY from '../src/layout/PlotXY';

export default {
  title: 'Layout/PlotXY',
} as Meta;

export function TestDropZone() {
  return <PlotXY />;
}
