import { Meta } from '@storybook/react';
import React from 'react';

import {
  MeasurementPlot,
  MeasurementPlotProps,
} from '../src/components/MeasurementPlot';

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
    zoom: 'horizontal',
    wheelZoom: 'vertical',
    crossHair: true,
    showHorizontalAxis: true,
    showVerticalAxis: true,
    showHorizontalGrid: true,
    showVerticalGrid: true,
    flipHorizontalAxis: false,
  },
} as Meta<Omit<MeasurementPlotProps, 'measurement'>>;

export function control(props: Omit<MeasurementPlotProps, 'measurement'>) {
  return <MeasurementPlot measurement={data} {...props} />;
}
