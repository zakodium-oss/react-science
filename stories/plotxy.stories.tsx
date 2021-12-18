import { Meta } from '@storybook/react';
import React from 'react';

/*
import Plot from '../src/layout/PlotOld';
import Axis from '../src/layout/PlotOld/Axis';
import Heading from '../src/layout/PlotOld/Heading';
import LineSeries from '../src/layout/PlotOld/LineSeries';
import data from './covid-cases.json';
*/
import PlotXY from '../src/layout/PlotXY';

export default {
  title: 'Layout/PlotXY',
} as Meta;

export function Test() {
  return <PlotXY />;
}
