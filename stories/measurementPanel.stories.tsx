import { Meta } from '@storybook/react';
import React from 'react';

import { MeasurementsPanel } from '../src';
import { Measurements } from '../src/components/context/data/DataState';

import { measurements } from './data/measurements.json';

export default {
  title: 'Layout/MeasurementsPanel',
  component: MeasurementsPanel,
} as Meta;

export function control() {
  return <MeasurementsPanel measurements={measurements as Measurements} />;
}
