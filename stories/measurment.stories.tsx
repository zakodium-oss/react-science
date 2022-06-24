import { Meta } from '@storybook/react';
import React from 'react';

import { MeasurementPlot, MeasurementPlotProps } from '../src';

import data from './data/measurement.json';

export default {
  title: 'Layout/MeasurementPlot',
  component: MeasurementPlot,
  args: {
    dataIndex: 0,
    xVariableName: 'x',
    yVariableName: 'y',
    width: 800,
    height: 400,
  },
} as Meta;

export function control(props: Omit<MeasurementPlotProps, 'measurement'>) {
  return <MeasurementPlot measurement={data} {...props} />;
}
