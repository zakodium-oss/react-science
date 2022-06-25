import { Meta } from '@storybook/react';
import React from 'react';

import { MeasurementExplorer, MeasurementExplorerProps } from '../src';

import data from './data/measurement.json';

export default {
  title: 'Layout/MeasurementExplorer',
  component: MeasurementExplorer,
  args: {
    width: 800,
    height: 400,
  },
} as Meta;

export function control(props: Omit<MeasurementExplorerProps, 'measurement'>) {
  return <MeasurementExplorer measurement={data} {...props} />;
}
